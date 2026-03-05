/**
 * Filters an array of profiles into two categories: clash and chain profiles.
 *
 * @param items - Array of Profile objects to be filtered
 * @returns An object containing two arrays:
 *          - clash: Array of profiles where type is 'remote' or 'local'
 *          - chain: Array of profiles where type is 'merge' or has a script property
 */
export function filterProfiles(items) {
    /**
     * Filters the input array to include only items of type 'remote' or 'local'
     * @param items - Array of items to filter
     * @returns {Array} Filtered array containing only remote and local items
     */
    const clash = items?.filter((item) => item.type === 'remote' || item.type === 'local');
    /**
     * Filters an array of items to get a chain of either 'merge' type items
     * or items with a script property in their type object.
     *
     * @param {Array<{ type: string | { script: 'javascript' | 'lua' } }>} items - The array of items to filter
     * @returns {Array<{ type: string | { script: 'javascript' | 'lua' } }>} A filtered array containing only merge items or items with scripts
     */
    const chain = items?.filter((item) => item.type === 'merge' || item.type === 'script');
    return {
        clash,
        chain,
    };
}
export const ProfileTypes = {
    JavaScript: { type: 'script', script_type: 'javascript' },
    LuaScript: { type: 'script', script_type: 'lua' },
    Merge: { type: 'merge' },
};
export const getLanguage = (profile) => {
    switch (profile.type) {
        case 'script':
            switch (profile.script_type) {
                case 'javascript':
                    return 'JavaScript';
                case 'lua':
                    return 'Lua';
            }
            break;
        case 'merge':
        case 'local':
        case 'remote':
            return 'YAML';
    }
};
