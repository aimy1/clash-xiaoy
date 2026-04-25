import { Theme } from '@mui/material'
import { Components } from '@mui/material/styles'

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: () => ({
      borderRadius: 24,
      backgroundImage: 'none',
      backgroundColor: 'var(--color-md-surface)',
      border: '1px solid var(--color-md-outline-variant)',
      boxShadow: 'var(--shadow-card, 0 10px 30px rgba(0, 0, 0, 0.12))',
    }),
  },
}
