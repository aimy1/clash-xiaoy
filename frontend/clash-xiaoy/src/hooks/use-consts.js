import useSWR from 'swr';
import { isAppImage } from '@nyanpasu/interface';
export const useIsAppImage = (config) => {
    return useSWR('/api/is_appimage', isAppImage, {
        ...(config || {}),
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
    });
};
