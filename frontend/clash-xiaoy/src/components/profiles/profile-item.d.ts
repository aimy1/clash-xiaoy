import { ProfileQueryResultItem } from '@nyanpasu/interface';
import { ClashProfile } from './utils';
export interface ProfileItemProps {
    item: ProfileQueryResultItem;
    selected?: boolean;
    maxLogLevelTriggered?: {
        global: undefined | 'info' | 'error' | 'warn';
        current: undefined | 'info' | 'error' | 'warn';
    };
    onClickChains: (item: ClashProfile) => void;
    chainsSelected?: boolean;
}
export declare const ProfileItem: import("react").NamedExoticComponent<ProfileItemProps>;
export default ProfileItem;
