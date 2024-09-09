import type { PropertyViewObject } from './types';

/**
 * Interface for implementations of a ts server component.
 */
export interface PropViewServer {
    /**
     * Notifies the server that the given URI has been opened
     * @param uri The URI of the model that should be observed
     */
    observeUri(uri: string): void;

    /**
     * Changes the provided object
     * @param updated the updated property view object
     */
    update(updated: PropertyViewObject): void;

    /**
     * Obtains the currently selected elements
     */
    selectedElements(): PropertyViewObject[];

    /**
     * The `shutdown` notification is sent from the client to the server if the client disconnects from the server (e.g.
     * the client application has been closed).
     * This gives the server a chance to clean up and dispose unknown resources dedicated to the client and its sessions.
     * All {@link PropViewServerListener}s are notified via the {@link PropViewServerListener.serverShutDown} method.
     * Afterwards the server instance is considered to be disposed and can no longer be used for handling requests.
     *
     */
    shutdown(): void;
}

export const PropViewServer = Symbol('PropViewServer');

/**
 * A listener to track the connection status of {@link PropViewClient}s (i.e. client applications).
 * Gets notified when a new PropView client connects or disconnects.
 */
export interface PropViewServerListener {
    /**
     * Triggered after a PropViewServer has been initialized via the {@link PropViewServer.initialize()}
     * method.
     *
     * @param server The PropViewServer which has been initialized.
     */
    serverInitialized?(server: PropViewServer): void;

    /**
     * Triggered after the {@link PropViewServer.shutdown()} method has been invoked.
     *
     * @param PropViewServer The PropViewServer which has been shut down.
     */
    serverShutDown?(server: PropViewServer): void;
}
export const PropViewServerListener = Symbol('PropViewServerListener');
