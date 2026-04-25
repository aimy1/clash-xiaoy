export declare function chains<T>(...handlers: Array<((event: T) => void) | undefined>): (event: T) => void;
