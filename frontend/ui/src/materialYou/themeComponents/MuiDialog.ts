import { Theme } from '@mui/material'
import { Components } from '@mui/material/styles'

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: {
      borderRadius: 20,
      backgroundImage: 'none',
      background: 'var(--cyber-glass-bg, var(--color-md-surface))',
      border:
        '1px solid var(--cyber-glass-border, var(--color-md-outline-variant))',
      backdropFilter: 'blur(var(--cyber-glass-blur, 16px))',
      WebkitBackdropFilter: 'blur(var(--cyber-glass-blur, 16px))',
    },
  },
}
