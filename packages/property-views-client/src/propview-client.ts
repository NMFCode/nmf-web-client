import * as uuid from 'uuid';
import type { PropertyViewObject } from './types';
import { AnyObject, hasStringProp } from './types';
import type { Disposable } from 'vscode-jsonrpc';

export class ApplicationIdProvider {
    private static _applicationId?: string;
    static get(): string {
        if (!ApplicationIdProvider._applicationId) {
            ApplicationIdProvider._applicationId = uuid.v4();
        }
        return ApplicationIdProvider._applicationId;
    }
}

export type PropertyViewObjectHandler = (obj: PropertyViewObject[]) => void;

export enum ClientState {
    /**
     * The client has been created.
     */
    Initial,
    /**
     * `Start` has been called on the client and the start process is still on-going.
     */
    Starting,
    /**
     * The client failed to complete the start process.
     */
    StartFailed,
    /**
     * The client was successfully started and is now running.
     */
    Running,
    /**
     * `Stop` has been called on the client and the stop process is still on-going.
     */
    Stopping,
    /**
     * The client stopped and disposed the server connection. Thus, action messages can no longer be sent.
     */
    Stopped,
    /**
     * An error was encountered while connecting to the server. No action messages can be sent.
     */
    ServerError
}

export interface PropViewClient {
    /**
     * Unique client Id.
     */
    readonly id: string;

    /**
     * Current client state.
     */
    readonly currentState: ClientState;

    /**
     * Initializes the client and the server connection. During the start procedure the client is in the
     * `Starting` state and will transition to either `Running` or `StartFailed`. Calling this method
     *  if the client is already running has no effect.
     *
     * @returns A promise that resolves if the startup was successful.
     */
    start(): Promise<void>;

    /**
     * Send a `shutdown` notification to the server.
     */
    shutdownServer(): void;

    /**
     * Stops the client and disposes unknown resources. During the stop procedure the client is in the `Stopping` state and will
     * transition to either `Stopped` or `ServerError`.
     *
     * @returns A promise that resolves after the server was stopped and disposed.
     */
    stop(): Promise<void>;

    /**
     * Notifies the server that the given URI has been opened
     * @param uri The URI of the model that should be observed
     */
    observeUri(uri: string): void;

    /**
     * Sends an update message to the server
     *
     * @param object the updated object that should be sent to the server
     */
    update(object: PropertyViewObject): void;

    /**
     * Obtains the currently selected elements
     */
    selectedElements(): Promise<PropertyViewObject[]>;

    /**
     * Sets a handler/listener for property view objects received from the server.
     *
     * @param handler The handler to process property view objects
     * @returns A {@link Disposable} that can be used to unregister the handler
     */
    onNewSelection(handler: PropertyViewObjectHandler): Disposable;
}
export namespace PropViewClient {
    export interface Options {
        id: string;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    export function isOptions(object: unknown): object is Options {
        return AnyObject.is(object) && hasStringProp(object, 'id');
    }

    export const protocolVersion = '1.0.0';
}
