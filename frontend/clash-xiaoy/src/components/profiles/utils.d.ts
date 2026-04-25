import type { Profile, ProfileBuilder } from '@nyanpasu/interface';
/**
 * Represents a Clash configuration profile, which can be either locally stored or fetched from a remote source.
 */
export type ClashProfile = Extract<Profile, {
    type: 'remote' | 'local';
}>;
export type ClashProfileBuilder = Extract<ProfileBuilder, {
    type: 'remote' | 'local';
}>;
/**
 * Represents a Clash configuration profile that is a chain of multiple profiles.
 */
export type ChainProfile = Extract<Profile, {
    type: 'merge' | 'script';
}>;
export type ChainProfileBuilder = Extract<ProfileBuilder, {
    type: 'merge' | 'script';
}>;
/**
 * Filters an array of profiles into two categories: clash and chain profiles.
 *
 * @param items - Array of Profile objects to be filtered
 * @returns An object containing two arrays:
 *          - clash: Array of profiles where type is 'remote' or 'local'
 *          - chain: Array of profiles where type is 'merge' or has a script property
 */
export declare function filterProfiles<T extends Profile>(items?: T[]): {
    clash: T[] | undefined;
    chain: T[] | undefined;
};
export type ProfileType = Profile['type'];
export declare const ProfileTypes: {
    readonly JavaScript: {
        readonly type: "script";
        readonly script_type: "javascript";
    };
    readonly LuaScript: {
        readonly type: "script";
        readonly script_type: "lua";
    };
    readonly Merge: {
        readonly type: "merge";
    };
};
export declare const getLanguage: (profile: Profile) => "JavaScript" | "Lua" | "YAML";
