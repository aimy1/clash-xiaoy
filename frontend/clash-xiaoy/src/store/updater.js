import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
export const UpdaterIgnoredAtom = atomWithStorage('updaterIgnored', null);
export const UpdaterInstanceAtom = atom(null);
