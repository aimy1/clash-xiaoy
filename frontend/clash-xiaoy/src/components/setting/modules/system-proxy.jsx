import { useControllableValue } from 'ahooks';
import { memo } from 'react';
import { mergeSxProps } from '@/utils/mui-theme';
import { CircularProgress } from '@mui/material';
import { alpha } from '@nyanpasu/ui';
import { PaperButton } from './nyanpasu-path';
export const PaperSwitchButton = memo(function PaperSwitchButton({ label, checked, loading, disableLoading, children, onClick, sxPaper, ...props }) {
    const [pending, setPending] = useControllableValue({ loading }, {
        defaultValue: false,
    });
    const handleClick = async () => {
        if (onClick) {
            if (disableLoading) {
                return onClick();
            }
            setPending(true);
            await onClick();
            setPending(false);
        }
    };
    return (<PaperButton label={label} sxPaper={mergeSxProps(((theme) => ({
            backgroundColor: checked
                ? alpha(theme.vars.palette.primary.main, 0.1)
                : theme.vars.palette.grey[100],
            ...theme.applyStyles('dark', {
                backgroundColor: checked
                    ? alpha(theme.vars.palette.primary.main, 0.1)
                    : theme.vars.palette.common.black,
            }),
        })), sxPaper)} sxButton={{
            flexDirection: 'column',
            alignItems: 'start',
            gap: 0.5,
        }} onClick={handleClick} {...props}>
      {pending === true && (<CircularProgress sx={{
                position: 'absolute',
                bottom: 'calc(50% - 12px)',
                right: 12,
            }} color="inherit" size={24}/>)}

      {children}
    </PaperButton>);
});
