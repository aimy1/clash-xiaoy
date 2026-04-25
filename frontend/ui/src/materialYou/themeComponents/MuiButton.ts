import { Theme } from '@mui/material'
import { Components } from '@mui/material/styles'

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '48px',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: 0,
      paddingInline: 14,
      minHeight: 36,

      '&.MuiColorInput-Button': {
        width: 28,
        height: 28,
        minWidth: 28,
        minHeight: 28,
        padding: 0,
        borderRadius: 'var(--radius-squircle)',
      },
    },
  },
}
