import { RecursivePartial } from '@/utils'
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import { createTheme, Palette } from '@mui/material/styles'
import {
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiDialog,
  MuiDialogActions,
  MuiDialogContent,
  MuiDialogTitle,
  MuiLinearProgress,
  MuiMenu,
  MuiPaper,
  MuiSwitch,
  MuiToggleButtonGroup,
} from './themeComponents'
import { MUI_BREAKPOINTS } from './themeConsts.mjs'

export const createMDYTheme = (color: string, fontFamily?: string) => {
  const materialColor = themeFromSourceColor(argbFromHex(color))

  const generatePalette = (mode: 'light' | 'dark') => {
    return {
      primary: {
        main: hexFromArgb(materialColor.schemes[mode].primary),
      },
      secondary: {
        main: hexFromArgb(materialColor.schemes[mode].secondary),
      },
      error: {
        main: hexFromArgb(materialColor.schemes[mode].error),
      },
      text: {
        primary: hexFromArgb(materialColor.schemes[mode].onPrimaryContainer),
        secondary: hexFromArgb(
          materialColor.schemes[mode].onSecondaryContainer,
        ),
      },
    } satisfies RecursivePartial<Palette>
  }
  const colorSchemes = {
    light: {
      palette: generatePalette('light'),
    },
    dark: {
      palette: generatePalette('dark'),
    },
  }
  const theme = createTheme(
    {
      cssVariables: {
        colorSchemeSelector: 'class',
      },
      colorSchemes: {
        light: true,
        dark: true,
      },
      shape: {
        borderRadius: 14,
      },
      typography: {
        fontFamily,
        button: {
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
      components: {
        MuiButton,
        MuiToggleButtonGroup,
        MuiCard,
        MuiCardContent,
        MuiDialog,
        MuiDialogActions,
        MuiDialogContent,
        MuiDialogTitle,
        MuiLinearProgress,
        MuiMenu,
        MuiPaper,
        MuiSwitch,
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              fontWeight: 600,
              letterSpacing: 0,
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              borderRadius: 12,
              padding: '8px 10px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(60, 60, 67, 0.92)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0,
            },
            arrow: {
              color: 'rgba(60, 60, 67, 0.92)',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 14,
              backgroundColor: 'var(--color-md-surface)',
              transition: 'box-shadow 180ms ease-out, transform 180ms ease-out',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-md-outline)',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 4px var(--primary-soft, rgba(0, 122, 255, 0.16))',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-main, var(--color-md-primary))',
                borderWidth: 1,
              },
            },
            notchedOutline: {
              borderColor: 'var(--color-md-outline-variant)',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            input: {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
        },
        MuiDialogContentText: {
          styleOverrides: {
            root: {
              color: 'var(--text-sub)',
              lineHeight: 1.45,
            },
          },
        },
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            },
          },
        },
      },
      breakpoints: MUI_BREAKPOINTS,
    },
    {
      colorSchemes,
    },
  )

  return theme
}
