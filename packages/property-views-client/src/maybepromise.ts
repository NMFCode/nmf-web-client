/**
 * Utility type to describe a value as might be provided as a promise.
 */
export type MaybePromise<T> = T | PromiseLike<T>;
