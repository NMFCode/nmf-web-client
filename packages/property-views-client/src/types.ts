/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Interface for objects visible in a property view
 */
export interface PropertyViewObject {
    /**
     * The URI of the object
     */
    uri: string;

    /**
     * The data of the object
     */
    data: any;

    /**
     * The identifier of the object
     */
    identifier?: string;

    /**
     * The JSON schema for the object
     */
    schema?: any;

    /**
     * The user interface schema for the object
     */
    uischema?: any;
}

/** Helper type to describe any defined object*/
export type AnyObject = object;

export namespace AnyObject {
    /**
     * Type guard to check wether a given object is of type {@link AnyObject}.
     * @param object The object to check.
     * @returns The given object as {@link AnyObject} or `false`.
     */
    export function is(object: unknown): object is AnyObject {
        return object !== null && typeof object === 'object';
    }
}

/**
 * Validates whether the given object has a property of type `string` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @param optional Flag to indicate wether the property can be optional i.e. also return true if the given key is undefined
 * @returns `true` if the object has property with matching key of type `string`.
 */
export function hasStringProp(object: AnyObject, propertyKey: string, optional = false): boolean {
    const property = (object as any)[propertyKey];
    return property !== undefined ? typeof property === 'string' : optional;
}
