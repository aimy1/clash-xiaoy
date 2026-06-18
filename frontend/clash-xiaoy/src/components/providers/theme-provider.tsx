import { isEqual, kebabCase } from 'lodash-es'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { insertStyle } from '@/utils/styled'
import {
  argbFromHex,
  hexFromArgb,
  Theme,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import { useSetting } from '@nyanpasu/interface'
import { appWindow } from '@/utils/tauri-window'
import { useLocalStorage } from '@uidotdev/usehooks'

export const DEFAULT_COLOR = '#eb00ff'
export const DEFAULT_DARK_COLOR = '#00fff0'
const OLD_DEFAULT_COLOR = '#1867C0'

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const CUSTOM_THEME_KEY = 'custom-theme' as const

const THEME_PALETTE_KEY = 'theme-palette-v3' as const
const THEME_CSS_VARS_KEY = 'theme-css-vars-v3' as const

const intToRgba = (int: number, alpha: number) => {
  const r = (int >> 16) & 0xff
  const g = (int >> 8) & 0xff
  const b = int & 0xff
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const generateThemeCssVars = ({ schemes }: Theme) => {
  let lightCssVars = 'html, :root, :root[data-theme="light"], :root.light {'
  let darkCssVars = 'html.dark, :root[data-theme="dark"], :root.dark {'

  Object.entries(schemes).forEach(([mode, scheme]) => {
    let inputScheme

    // Safely convert scheme to JSON if possible, otherwise use as-is
    if (typeof scheme.toJSON === 'function') {
      inputScheme = scheme.toJSON()
    } else {
      inputScheme = scheme
    }

    Object.entries(inputScheme).forEach(([key, value]) => {
      const cssVar = `--color-md-${kebabCase(key)}: ${hexFromArgb(value)};`
      
      if (mode === 'light') {
        lightCssVars += cssVar
        if (key === 'primary') {
          lightCssVars += `--primary: ${hexFromArgb(value)};`
          lightCssVars += `--primary-main: ${hexFromArgb(value)};`
          // Light mode overrides
          lightCssVars += `--background-color-alpha: ${intToRgba(value, 0.1)};`
        }
      } else {
        darkCssVars += cssVar
        if (key === 'primary') {
          darkCssVars += `--primary: ${hexFromArgb(value)};`
          darkCssVars += `--primary-main: ${hexFromArgb(value)};`
          // Dark mode overrides
          darkCssVars += `--primary-soft: ${intToRgba(value, 0.15)};`
          darkCssVars += `--primary-strong: ${intToRgba(value, 0.25)};`
          darkCssVars += `--selection-color: ${intToRgba(value, 0.22)};`
          darkCssVars += `--glow-primary: 0 0 12px ${intToRgba(value, 0.35)};`
        }
      }
    })
  })

  lightCssVars += '}'
  darkCssVars += '}'

  return lightCssVars + darkCssVars
}

const changeHtmlThemeMode = (mode: Omit<ThemeMode, 'system'>) => {
  const root = document.documentElement

  if (mode === ThemeMode.DARK) {
    root.classList.add(ThemeMode.DARK)
  } else {
    root.classList.remove(ThemeMode.DARK)
  }

  if (mode === ThemeMode.LIGHT) {
    root.classList.add(ThemeMode.LIGHT)
  } else {
    root.classList.remove(ThemeMode.LIGHT)
  }
}

const ThemeContext = createContext<{
  themePalette: Theme
  themeCssVars: string
  themeColor: string
  setThemeColor: (color: string) => Promise<void>
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => Promise<void>
} | null>(null)

export function useExperimentalThemeContext() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useExperimentalThemeContext must be used within a ExperimentalThemeProvider',
    )
  }

  return context
}

export function ExperimentalThemeProvider({ children }: PropsWithChildren) {
  const themeMode = useSetting('theme_mode')

  const themeColor = useSetting('theme_color')
  const backgroundImage = useSetting('background_image')

  const themeColorValue = themeColor.value ?? ''

  const [resolvedThemeMode, setResolvedThemeMode] = useState<ThemeMode>(
    themeMode.value === ThemeMode.SYSTEM
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
      : (themeMode.value as ThemeMode),
  )

  useEffect(() => {
    if (themeMode.value === ThemeMode.SYSTEM) {
      const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT
      setResolvedThemeMode(mode)
    } else {
      setResolvedThemeMode(themeMode.value as ThemeMode)
    }
  }, [themeMode.value])

  const isUsingDefault =
    !themeColorValue || themeColorValue.toLowerCase() === OLD_DEFAULT_COLOR.toLowerCase()

  const [cachedThemePalette, setCachedThemePalette] = useLocalStorage<Theme>(
    THEME_PALETTE_KEY,
    themeFromSourceColor(
      // use default color if theme color is not set or is old default
      argbFromHex(
        isUsingDefault
          ? (resolvedThemeMode === ThemeMode.DARK ? DEFAULT_DARK_COLOR : DEFAULT_COLOR)
          : themeColorValue,
      ),
    ),
  )

  const [cachedThemeCssVars, setCachedThemeCssVars] = useLocalStorage<string>(
    THEME_CSS_VARS_KEY,
    // initialize theme css vars from cached theme palette
    generateThemeCssVars(cachedThemePalette),
  )

  // Debug logs
  useEffect(() => {
    // Clean up old cache versions
    localStorage.removeItem('theme-palette-v1')
    localStorage.removeItem('theme-css-vars-v1')
    localStorage.removeItem('theme-palette-v2')
    localStorage.removeItem('theme-css-vars-v2')

    // Auto-migrate old default color to empty (so new defaults apply)
    if (themeColor.value && themeColor.value.toLowerCase() === OLD_DEFAULT_COLOR.toLowerCase()) {
      themeColor.upsert('')
    }
  }, [themeColor.value])

  // Force update palette if it's using old default or mismatch
  useEffect(() => {
    const targetColor = isUsingDefault
      ? resolvedThemeMode === ThemeMode.DARK
        ? DEFAULT_DARK_COLOR
        : DEFAULT_COLOR
      : themeColorValue

    const materialColor = themeFromSourceColor(argbFromHex(targetColor))

    if (!isEqual(materialColor, cachedThemePalette)) {
      setCachedThemePalette(materialColor)
      const themeCssVars = generateThemeCssVars(materialColor)
      setCachedThemeCssVars(themeCssVars)
    }
  }, [themeColorValue, resolvedThemeMode, isUsingDefault, cachedThemePalette])

  // automatically insert custom theme css vars into document head
  useEffect(() => {
    insertStyle(CUSTOM_THEME_KEY, cachedThemeCssVars)
  }, [cachedThemeCssVars])

  useEffect(() => {
    const root = document.documentElement
    if (!backgroundImage.value) {
      root.style.setProperty('--app-wallpaper', 'none')
      root.dataset.wallpaper = '0'
      return
    }
    const safeUrl = backgroundImage.value.replaceAll('"', '%22')
    root.style.setProperty('--app-wallpaper', `url("${safeUrl}")`)
    root.dataset.wallpaper = '1'
  }, [backgroundImage.value])

  const setThemeColor = useCallback(
    async (color: string) => {
      if (color === themeColorValue) {
        return
      } else {
        await themeColor.upsert(color)
      }

      const isUsingDefault = !color || color === OLD_DEFAULT_COLOR

      const materialColor = themeFromSourceColor(
        // use default color if theme color is not set
        argbFromHex(
          isUsingDefault
            ? (resolvedThemeMode === ThemeMode.DARK
              ? DEFAULT_DARK_COLOR
              : DEFAULT_COLOR)
            : color,
        ),
      )

      if (isEqual(materialColor, cachedThemePalette)) {
        return
      } else {
        setCachedThemePalette(materialColor)
      }

      const themeCssVars = generateThemeCssVars(materialColor)
      setCachedThemeCssVars(themeCssVars)
    },
    [
      themeColor,
      themeColorValue,
      cachedThemePalette,
      setCachedThemeCssVars,
      setCachedThemePalette,
      themeMode.value, // Added dependency
    ],
  )

  // listen to theme changed event and change html theme mode
  useEffect(() => {
    let unlisten: Promise<() => void> | undefined

    try {
      unlisten = appWindow.onThemeChanged((e) => {
        if (themeMode.value === ThemeMode.SYSTEM) {
          const newMode = e.payload as ThemeMode
          changeHtmlThemeMode(newMode)
          setResolvedThemeMode(newMode)

          // Update theme color if using default or old default
          if (!themeColorValue || themeColorValue === OLD_DEFAULT_COLOR) {
            const newDefaultColor =
              newMode === ThemeMode.DARK ? DEFAULT_DARK_COLOR : DEFAULT_COLOR
            const materialColor = themeFromSourceColor(argbFromHex(newDefaultColor))
            
            // We need to use function form of state setter here because this runs in an event listener
            // where cachedThemePalette might be stale closure
            setCachedThemePalette((current) => {
                if (!isEqual(materialColor, current)) {
                    // Side effect: update CSS vars
                    const themeCssVars = generateThemeCssVars(materialColor)
                    setCachedThemeCssVars(themeCssVars)
                    return materialColor
                }
                return current
            })
          }
        }
      })
    } catch (e) {
      console.warn('Failed to listen to theme changes', e)
    }

    return () => {
      if (unlisten) {
        unlisten.then((fn) => fn()).catch(console.error)
      }
    }
  }, [themeMode.value, themeColorValue]) // Added themeColor.value dependency

  const setThemeMode = useCallback(
    async (mode: ThemeMode) => {
      // if theme mode is not system, change html theme mode
      if (mode !== ThemeMode.SYSTEM) {
        changeHtmlThemeMode(mode)
      }

      if (mode !== themeMode.value) {
        await themeMode.upsert(mode)
      }

      // Re-evaluate theme color when mode changes
      // Update resolved mode immediately for smoother transition
      const newResolvedMode =
        mode === ThemeMode.SYSTEM
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeMode.DARK
            : ThemeMode.LIGHT
          : mode

      if (!themeColorValue || themeColorValue === OLD_DEFAULT_COLOR) {
        const newDefaultColor =
          newResolvedMode === ThemeMode.DARK ? DEFAULT_DARK_COLOR : DEFAULT_COLOR
        const materialColor = themeFromSourceColor(argbFromHex(newDefaultColor))

        if (!isEqual(materialColor, cachedThemePalette)) {
          setCachedThemePalette(materialColor)
          const themeCssVars = generateThemeCssVars(materialColor)
          setCachedThemeCssVars(themeCssVars)
        }
      }
    },
    [
      themeMode,
      themeColorValue,
      setCachedThemePalette,
      setCachedThemeCssVars,
      cachedThemePalette,
    ],
  )

  return (
    <ThemeContext.Provider
      value={{
        themePalette: cachedThemePalette,
        themeCssVars: cachedThemeCssVars,
        themeColor:
          (isUsingDefault
            ? (resolvedThemeMode === ThemeMode.DARK ? DEFAULT_DARK_COLOR : DEFAULT_COLOR)
            : themeColorValue),
        setThemeColor,
        themeMode: themeMode.value as ThemeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
