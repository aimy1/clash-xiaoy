import { EnvInfos } from '@nyanpasu/interface';
/**
 * classNames filter out falsy values and join the rest with a space
 * @param classes - array of classes
 * @returns string of classes
 */
export declare function classNames(...classes: any[]): string;
export declare function sleep(ms: number): Promise<unknown>;
export declare const containsSearchTerm: (obj: any, term: string) => boolean;
export declare function formatError(err: unknown): string;
export declare function formatEnvInfos(envs: EnvInfos): string;
