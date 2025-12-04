import type {
    DataCallback,
    Logger,
    Message,
    MessageConnection
} from 'vscode-jsonrpc';
import {
    AbstractMessageReader,
    AbstractMessageWriter,
    createMessageConnection,
    Disposable
} from 'vscode-jsonrpc';
import type { MaybePromise } from './maybepromise';

export interface PropViewWebSocketOptions {
    /**
     * Allow automatic reconnect of WebSocket connections
     * @default true
     */
    reconnecting?: boolean;
    /**
     * Max attempts of reconnects
     * @default Infinity
     */
    reconnectAttempts?: number;
    /**
     * The time delay in milliseconds between reconnect attempts
     * @default 1000
     */
    reconnectDelay?: number;
}

export const PropViewConnectionHandler = Symbol('PropViewConnectionHandler');
export interface PropViewConnectionHandler {
    onConnection?(connection: MessageConnection): MaybePromise<void>;
    onReconnect?(connection: MessageConnection): MaybePromise<void>;
    logger?: Logger;
}

/**
 * A wrapper interface that enables the reuse of the {@link WebSocketMessageReader} and {@link WebSocketMessageWriter}
 * independent of the underlying WebSocket implementation/library. e.g. one could use Socket.io instead of plain WebSockets
 */
export interface WebSocketWrapper extends Disposable {
    send(content: string | ArrayBufferLike | ArrayBufferView): void;
    onMessage(cb: (data: unknown) => void): void;
    onError(cb: (reason: unknown) => void): void;
    onClose(cb: (code: number, reason: string) => void): void;
}

/**
 * Creates a {@link WebSocketWrapper} for the given plain WebSocket
 * @param socket The socket to wrap
 */
export function wrap(socket: WebSocket): WebSocketWrapper {
    return {
        send: content => socket.send(content),
        onMessage: cb => (socket.onmessage = event => cb(event.data)),
        onClose: cb => (socket.onclose = event => cb(event.code, event.reason)),
        onError: cb =>
            (socket.onerror = event => {
                if ('error' in event) {
                    cb(event.error);
                }
            }),
        dispose: () => socket.close()
    };
}

/**
 * A `vscode-jsonrpc` {@link MessageReader} that reads messages from an underlying {@link WebSocketWrapper}.
 */
class WebSocketMessageReader extends AbstractMessageReader {
    protected state: 'initial' | 'listening' | 'closed' = 'initial';
    protected callback?: DataCallback;
    protected eventQueue: Array<{ message?: unknown; error?: unknown }> = [];
    protected readonly socket: WebSocketWrapper;

    constructor(socket: WebSocketWrapper) {
        super();
        this.socket = socket;
        this.socket.onMessage(message => this.handleMessage(message));
        this.socket.onError(error => this.fireError(error));
        this.socket.onClose(() => this.fireClose());
    }

    listen(callback: DataCallback): Disposable {
        if (this.state === 'initial') {
            this.state = 'listening';
            this.callback = callback;
            this.eventQueue.forEach(event => {
                if (event.message) {
                    this.handleMessage(event.message);
                } else if (event.error) {
                    this.fireError(event.error);
                } else {
                    this.fireClose();
                }
            });
            this.eventQueue = [];
        }
        return Disposable.create(() => {
            this.callback = undefined;
            this.eventQueue = [];
        });
    }

    protected handleMessage(message: unknown): void {
        if (this.state === 'initial') {
            this.eventQueue.push({ message });
        } else if (this.state === 'listening') {
            const data = JSON.parse(message as string);
            this.callback!(data);
        }
    }

    protected override fireError(error: unknown): void {
        if (this.state === 'initial') {
            this.eventQueue.push({ error });
        } else if (this.state === 'listening') {
            super.fireError(error);
        }
    }

    protected override fireClose(): void {
        if (this.state === 'initial') {
            this.eventQueue.push({});
        } else if (this.state === 'listening') {
            super.fireClose();
        }
        this.state = 'closed';
    }
}

/**
 * A `vscode-jsonrpc` {@link MessageReader} that writes messages to an underlying {@link WebSocketWrapper}.
 */
class WebSocketMessageWriter extends AbstractMessageWriter {
    protected errorCount = 0;
    protected readonly socket: WebSocketWrapper;

    constructor(socket: WebSocketWrapper) {
        super();
        this.socket = socket;
    }

    end(): void {
        /** no-op */
    }

    async write(msg: Message): Promise<void> {
        try {
            const content = JSON.stringify(msg);
            this.socket.send(content);
        } catch (e) {
            this.errorCount++;
            this.fireError(e, msg, this.errorCount);
        }
    }
}

/**
 * Create a `vscode-jsonrpc` {@link MessageConnection} on top of a given {@link WebSocketWrapper}.
 */
function createWebSocketConnection(socket: WebSocketWrapper, logger?: Logger): MessageConnection {
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    return createMessageConnection(reader, writer, logger);
}

/**
 * Creates a new {@link MessageConnection} on top of the given websocket on open.
 * @param webSocket The target webSocket
 * @param onConnection Optional callback that is invoked after the connection has been created
 * @param logger Optional connection logger
 * @returns A promise of the created connection
 */
export function listen(
    webSocket: WebSocket,
    onConnection?: (connection: MessageConnection) => void,
    logger?: Logger
): Promise<MessageConnection> {
    return new Promise(resolve => {
        webSocket.onopen = () => {
            const socket = wrap(webSocket);
            const connection = createWebSocketConnection(socket, logger);
            onConnection?.(connection);
            resolve(connection);
        };
    });
}

export class PropViewWebSocketProvider {
    protected webSocket: WebSocket;
    protected reconnectTimer: NodeJS.Timeout;
    protected reconnectAttempts = 0;
    protected url: string;

    protected options: PropViewWebSocketOptions = {
        // default values
        reconnecting: true,
        reconnectAttempts: Infinity,
        reconnectDelay: 1000
    };

    constructor(url: string, options?: PropViewWebSocketOptions) {
        this.options = Object.assign(this.options, options);
        this.url = url;
    }

    protected createWebSocket(url: string): WebSocket {
        return new WebSocket(url);
    }

    listen(handler: PropViewConnectionHandler, isReconnecting = false): Promise<MessageConnection> {
        this.webSocket = this.createWebSocket(this.url);

        this.webSocket.onerror = (): void => {
            handler.logger?.error('PropViewWebSocketProvider Connection to server errored. Please make sure that the server is running!');
            clearInterval(this.reconnectTimer);
            this.webSocket.close();
        };

        return new Promise(resolve => {
            this.webSocket.onopen = async (): Promise<void> =>  {
                clearInterval(this.reconnectTimer);
                const wrappedSocket = wrap(this.webSocket);
                const wsConnection = createWebSocketConnection(wrappedSocket, handler.logger);

                this.webSocket.onclose = (): void => {
                    const { reconnecting, reconnectAttempts, reconnectDelay } = this.options;
                    if (reconnecting) {
                        if (this.reconnectAttempts >= reconnectAttempts!) {
                            handler.logger?.error(
                                'PropViewWebSocketProvider WebSocket reconnect failed - maximum number reconnect attempts ' +
                                `(${reconnectAttempts}) was exceeded!`
                            );
                        } else {
                            this.reconnectTimer = setInterval(() => {
                                handler.logger?.warn('PropViewWebSocketProvider reconnecting...');
                                this.listen(handler, true);
                                this.reconnectAttempts++;
                            }, reconnectDelay!);
                        }
                    } else {
                        handler.logger?.error('PropViewWebSocketProvider WebSocket will not reconnect - closing the connection now!');
                    }
                };

                if (isReconnecting) {
                    handler.logger?.warn('PropViewWebSocketProvider Reconnecting!');
                    await handler.onReconnect?.(wsConnection);
                } else {
                    handler.logger?.warn('PropViewWebSocketProvider Initializing!');
                    handler.onConnection?.(wsConnection);
                }
                resolve(wsConnection);
            };
        });
    }
}
