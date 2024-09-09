import type { MessageConnection} from 'vscode-jsonrpc';
import { NotificationType, NotificationType0, RequestType } from 'vscode-jsonrpc';
import type { MaybePromise } from './maybepromise';
import { PropViewClient } from './propview-client';
import type { PropertyViewObject } from './types';

export type ConnectionProvider = MessageConnection | (() => MaybePromise<MessageConnection>);

export interface ObserveUriRequest {
    uri: string;
}

export interface UpdateRequest {
    updated: PropertyViewObject;
}

export namespace JsonrpcPropViewClient {
    export interface Options extends PropViewClient.Options {
        connectionProvider: ConnectionProvider;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    export function isOptions(object: unknown): object is Options {
        return PropViewClient.isOptions(object) && 'connectionProvider' in object;
    }

    export const SelectionChangedNotification = new NotificationType<PropertyViewObject[]>('selectedelementschanged');
    export const ObserveUriRequest = new RequestType<ObserveUriRequest, void, void>('observeUri');
    export const UpdateRequest = new RequestType<UpdateRequest, void, void>('update');
    export const SelectedElementsRequest = new RequestType<void, PropertyViewObject[], void>('selectedElements');

    export const ShutdownNotification = new NotificationType0('shutdown');
    export const ClientNotReadyMsg = 'JsonrpcPropViewClient is not ready yet';

    export function error(message: string, ...optionalParams: unknown[]): void {
        console.error(`[JsonrpcPropViewClient] ${message}`, optionalParams);
    }
}
