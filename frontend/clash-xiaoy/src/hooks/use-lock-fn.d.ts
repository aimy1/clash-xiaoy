export type LockFn<P extends any[] = any[], T = any> = (...args: P) => Promise<T>;
/**
 * Hook similar to ahooks useLockFn - prevents concurrent execution of async functions
 * When the function is executing, subsequent calls will be ignored until the function completes
 */
export declare function useLockFn<P extends any[] = any[], T = any>(fn: LockFn<P, T>): LockFn<P, T>;
