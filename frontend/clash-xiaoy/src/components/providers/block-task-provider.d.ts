import { PropsWithChildren } from 'react';
type BlockTaskStatus = 'idle' | 'pending' | 'success' | 'error';
interface BlockTask<T = any> {
    id: string;
    status: BlockTaskStatus;
    data?: T;
    error?: Error;
    startTime: number;
    endTime?: number;
}
interface BlockTaskContextType {
    tasks: Record<string, BlockTask>;
    run: <T>(key: string, fn: () => Promise<T>) => Promise<T>;
    getTask: (key: string) => BlockTask | undefined;
    clearTask: (key: string) => void;
}
export declare const useBlockTaskContext: () => BlockTaskContextType;
export declare const useBlockTask: <T>(key: string, fn: () => Promise<T>) => {
    execute: import("@/hooks/use-lock-fn").LockFn<[], T>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: any;
    error: Error | undefined;
};
export declare const BlockTaskProvider: ({ children }: PropsWithChildren) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
