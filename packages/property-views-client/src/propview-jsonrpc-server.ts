
import type { MessageConnection } from 'vscode-jsonrpc';
import type { PropViewServer } from './propview-server';
import { JsonrpcPropViewClient } from './propview-jsonrpc-client';
import type { PropertyViewObject } from './types';

/**
 * Configure the given client connection to forward the requests and notifications to the given {@link PropViewServer} instance.
 * @param clientConnection JSON-RPC client connection.
 * @param PropViewServer The PropView Server which should react to requests & notifications.
 */
export function configureClientConnection(clientConnection: MessageConnection, PropViewServer: PropViewServer): void {
    clientConnection.onRequest(JsonrpcPropViewClient.ObserveUriRequest.method, (uri: string) => PropViewServer.observeUri(uri));
    clientConnection.onRequest(JsonrpcPropViewClient.UpdateRequest.method, (obj: PropertyViewObject) => PropViewServer.update(obj));
    clientConnection.onRequest(JsonrpcPropViewClient.SelectedElementsRequest.method, () => PropViewServer.selectedElements());

    clientConnection.listen();
}
