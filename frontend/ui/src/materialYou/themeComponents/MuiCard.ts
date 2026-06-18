import { Theme } from '@mui/material'
import { Components } from '@mui/material/styles'

export const MuiCard: Components<Theme>['MuiCard'] = {
  defaultProps: {
    sx: {
      borderRadius: 24,
      elevation: 0,
    },
  },
}
