import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { openThat } from '@nyanpasu/interface';
import { alpha, LoadingSwitch } from '@nyanpasu/ui';
/**
 * @example
 * <LabelSwitch
    label={label}
    url={url}
    checked={true}
    onChange={(key) => console.log(key)}
  />
 * `Design for Clash Filed use.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export const LabelSwitch = ({ label, url, onChange, ...props }) => {
    const [loading, setLoading] = useState(false);
    const handleChange = async (event, checked) => {
        if (onChange) {
            try {
                setLoading(true);
                await onChange(event, checked);
            }
            finally {
                setLoading(false);
            }
        }
    };
    return (<Paper sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
            borderRadius: 6,
            backgroundColor: alpha(theme.vars.palette.primary.main, 0.1),
        })} elevation={0}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography noWrap>{label}</Typography>

        {url && (<Tooltip title="What this field?">
            <IconButton size="small" onClick={() => openThat(url)}>
              <OpenInNewRounded sx={{ width: 16, height: 16 }}/>
            </IconButton>
          </Tooltip>)}
      </Box>

      {/* <Switch {...props} /> */}
      <LoadingSwitch loading={loading} onChange={handleChange} {...props}/>
    </Paper>);
};
/**
 * @example
 * <ClashFieldItem
    label={label}
    fields={string[]}
    onClick={() => console.log("open")}
  />

 * `Design for Clash Filed use.`
 *
 * @author keiko233 <i@elaina.moe>
 * @copyright LibNyanpasu org. 2024
 */
export const ClashFieldItem = ({ label, fields, ...props }) => {
    return (<Grid size={{
            xs: 6,
            xl: 3,
        }}>
      <Paper elevation={0} sx={(theme) => ({
            borderRadius: 6,
            backgroundColor: alpha(theme.vars.palette.primary.main, 0.1),
        })}>
        <ButtonBase sx={{
            borderRadius: 6,
            width: '100%',
            textAlign: 'start',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }} {...props}>
          <Box width="calc(100% - 8px)">
            <Typography sx={{
            textTransform: 'capitalize',
            fontWeight: 700,
        }}>
              {label}
            </Typography>

            <Marquee speed={36}>
              <Box display="flex" gap={1} sx={{ paddingRight: 16 }}>
                <span>Enabled: </span>

                {fields.map((item, index) => {
            return <span key={index}>{item}</span>;
        })}
              </Box>
            </Marquee>
          </Box>

          <ArrowForwardIos sx={{ width: 16, height: 16 }}/>
        </ButtonBase>
      </Paper>
    </Grid>);
};
