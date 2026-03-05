import { memo } from 'react';
import { mergeSxProps } from '@/utils/mui-theme';
import { Chip } from '@mui/material';
export const FeatureChip = memo(function FeatureChip(props) {
    return (<Chip variant="outlined" size="small" {...props} sx={mergeSxProps({
            fontSize: 10,
            height: 16,
            padding: 0,
            '& .MuiChip-label': {
                padding: '0 4px',
            },
        }, props.sx)}/>);
});
export default FeatureChip;
