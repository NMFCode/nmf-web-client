import type { Disposable, Message, MessageConnection } from 'vscode-jsonrpc';
import { Emitter } from 'vscode-jsonrpc';
import type { PropertyViewObjectHandler, PropViewClient } from './propview-client';
import { ClientState } from './propview-client';
import type { ConnectionProvider} from './propview-jsonrpc-client';
import { JsonrpcPropViewClient } from './propview-jsonrpc-client';
import type { PropertyViewObject } from './types';
import type { Event } from 'vscode-jsonrpc';

export class BaseJsonrpcPropViewClient implements PropViewClient {
    readonly id: string;
    protected readonly connectionProvider: ConnectionProvider;
    protected connectionPromise?: Promise<MessageConnection>;
    protected resolvedConnection?: MessageConnection;
    protected state: ClientState;
    protected onStop?: Promise<void>;
    protected handler: PropertyViewObjectHandler;

    protected onNewSelectionNotificationEmitter = new Emitter<PropertyViewObject[]>();
    protected get onNewSelectionNotification(): Event<PropertyViewObject[]> {
        return this.onNewSelectionNotificationEmitter.event;
    }

    constructor(handler: PropertyViewObjectHandler, options: JsonrpcPropViewClient.Options) {
        Object.assign(this, options);
        this.state = ClientState.Initial;
        this.handler = handler;
    }

    observeUri(uri: string): void {
        this.checkedConnection.sendRequest(JsonrpcPropViewClient.ObserveUriRequest, { uri:uri});
    }
    update(object: PropertyViewObject): void {
        this.checkedConnection.sendRequest(JsonrpcPropViewClient.UpdateRequest, {updated: object });
    }

    selectedElements(): Promise<PropertyViewObject[]> {
        return this.checkedConnection.sendRequest(JsonrpcPropViewClient.SelectedElementsRequest, null);
    }

    shutdownServer(): void {
        this.checkedConnection.sendNotification(JsonrpcPropViewClient.ShutdownNotification);
    }

    onNewSelection(handler: PropertyViewObjectHandler): Disposable {
        return this.onNewSelectionNotification(msg => {
            handler(msg);
        });
    }

    protected get checkedConnection(): MessageConnection {
        if (!this.isConnectionActive()) {
            throw new Error(JsonrpcPropViewClient.ClientNotReadyMsg);
        }
        return this.resolvedConnection!;
    }

    async start(): Promise<void> {
        if (this.state === ClientState.Running) {
            return;
        }
        try {
            this.state = ClientState.Starting;
            const connection = await this.resolveConnection();
            connection.listen();
            this.resolvedConnection = connection;
            this.state = ClientState.Running;
        } catch (error) {
            JsonrpcPropViewClient.error('Failed to start connection to server', error);
            this.state = ClientState.StartFailed;
        }
    }

    stop(): Promise<void> {
        if (!this.connectionPromise) {
            this.state = ClientState.Stopped;
            return Promise.resolve();
        }
        if (this.state === ClientState.Stopping && this.onStop) {
            return this.onStop;
        }
        this.state = ClientState.Stopping;
        return (this.onStop = this.resolveConnection().then(connection => {
            connection.dispose();
            this.state = ClientState.Stopped;
            this.onStop = undefined;
            this.connectionPromise = undefined;
            this.resolvedConnection = undefined;
        }));
    }

    protected resolveConnection(): Promise<MessageConnection> {
        if (!this.connectionPromise) {
            this.connectionPromise = this.doCreateConnection();
        }
        return this.connectionPromise;
    }

    protected async doCreateConnection(): Promise<MessageConnection> {
        const connection = typeof this.connectionProvider === 'function' ? await this.connectionProvider() : this.connectionProvider;
        connection.onError(data => this.handleConnectionError(data[0], data[1], data[2]));
        connection.onClose(() => this.handleConnectionClosed());
        connection.onNotification(JsonrpcPropViewClient.SelectionChangedNotification, msg => this.handler(msg));
        return connection;
    }

    protected handleConnectionError(error: Error, message: Message | undefined, count: number | undefined): void {
        JsonrpcPropViewClient.error('Connection to server is erroring. Shutting down server.', error);
        this.stop();
        this.state = ClientState.ServerError;
    }

    protected handleConnectionClosed(): void {
        if (this.state === ClientState.Stopping || this.state === ClientState.Stopped) {
            return;
        }
        try {
            if (this.resolvedConnection) {
                this.resolvedConnection.dispose();
                this.connectionPromise = undefined;
                this.resolvedConnection = undefined;
            }
        } catch (error) {
            // Disposing a connection could fail if error cases.
        }

        JsonrpcPropViewClient.error('Connection to server got closed. Server will not be restarted.');
        this.state = ClientState.ServerError;
    }

    isConnectionActive(): boolean {
        return this.state === ClientState.Running && !!this.resolvedConnection;
    }

    get currentState(): ClientState {
        return this.state;
    }
}
