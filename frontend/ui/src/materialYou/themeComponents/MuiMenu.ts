import { Theme } from '@mui/material'
import { Components } from '@mui/material/styles'

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: `${theme.shadows[8]} !important`,
      borderRadius: 14,
      background: 'var(--cyber-glass-bg, var(--color-md-surface))',
      border: '1px solid var(--cyber-glass-border, var(--color-md-outline-variant))',
      backdropFilter: 'blur(var(--cyber-glass-blur, 16px))',
      WebkitBackdropFilter: 'blur(var(--cyber-glass-blur, 16px))',
    }),
  },
}
