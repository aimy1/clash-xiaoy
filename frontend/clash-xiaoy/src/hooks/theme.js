const delayThresholds = [
    {
        max: -1,
        sx: (theme) => ({ color: theme.vars.palette.text.primary }),
    },
    {
        max: 0,
        sx: (theme) => ({ color: theme.vars.palette.text.secondary }),
    },
    {
        max: 1,
        sx: (theme) => ({ color: theme.vars.palette.text.secondary }),
    },
    {
        max: 500,
        sx: (theme) => ({ color: theme.vars.palette.success.main }),
    },
    {
        max: 2000,
        sx: (theme) => ({ color: theme.vars.palette.warning.main }),
    },
    {
        max: Infinity,
        sx: (theme) => ({ color: theme.vars.palette.error.main }),
    },
];
export const useColorSxForDelay = (delay) => {
    if (delay === -1) {
        return delayThresholds[0].sx;
    }
    return (delayThresholds.find((threshold) => delay <= threshold.max)?.sx ||
        delayThresholds[delayThresholds.length - 1].sx);
};
