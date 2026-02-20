import { useAtom } from 'jotai'
import { MuiColorInput } from 'mui-color-input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isHexColor } from 'validator'
import { atomIsDrawerOnlyIcon } from '@/store'
import { setEnabledExperimentalRouter } from '@/utils/experimental'
import { languageOptions } from '@/utils/language'
import Done from '@mui/icons-material/Done'
import { Button, List, ListItem, ListItemText } from '@mui/material'
import { useSetting } from '@nyanpasu/interface'
import { BaseCard, Expand, MenuItem, SwitchItem } from '@nyanpasu/ui'
import { useNavigate } from '@tanstack/react-router'
import { DEFAULT_COLOR } from '../layout/use-custom-theme'

const commonSx = {
  width: 128,
}

const LanguageSwitch = () => {
  const { t } = useTranslation()

  const language = useSetting('language')

  return (
    <MenuItem
      label={t('Language')}
      selectSx={commonSx}
      options={languageOptions}
      selected={language.value || 'en'}
      onSelected={(value) => language.upsert(value as string)}
    />
  )
}

const ThemeSwitch = () => {
  const { t } = useTranslation()

  const themeOptions = {
    dark: t('theme.dark'),
    light: t('theme.light'),
    system: t('theme.system'),
  }

  const themeMode = useSetting('theme_mode')

  return (
    <MenuItem
      label={t('Theme Mode')}
      selectSx={commonSx}
      options={themeOptions}
      selected={themeMode.value || 'system'}
      onSelected={(value) => themeMode.upsert(value as string)}
    />
  )
}

const ThemeColor = () => {
  const { t } = useTranslation()

  const theme = useSetting('theme_color')

  const [value, setValue] = useState(theme.value ?? DEFAULT_COLOR)

  useEffect(() => {
    setValue(theme.value ?? DEFAULT_COLOR)
  }, [theme.value])

  return (
    <>
      <ListItem sx={{ pl: 0, pr: 0 }}>
        <ListItemText primary={t('Theme Setting')} />

        <MuiColorInput
          size="small"
          sx={{
            ...commonSx,
            '& .MuiColorInput-Button': {
              width: 28,
              height: 28,
              minWidth: 28,
              minHeight: 28,
              padding: 0,
              borderRadius: 'var(--radius-squircle)',
              boxShadow:
                '0 1px 0 rgba(255, 255, 255, 0.12) inset, var(--shadow-card-active)',
              transition:
                'transform var(--motion-duration-medium) var(--motion-ease-ios), box-shadow var(--motion-duration-medium) var(--motion-ease-ios)',
            },
            '& .MuiColorInput-Button:hover': {
              transform: 'translateY(-1px)',
              boxShadow:
                '0 1px 0 rgba(255, 255, 255, 0.14) inset, var(--shadow-card-hover)',
            },
            '& .MuiColorInput-Button:active': {
              transform: 'translateY(0) scale(0.985)',
              transitionTimingFunction: 'var(--motion-ease-spring)',
              transitionDuration: 'var(--motion-duration-fast)',
              boxShadow:
                '0 1px 0 rgba(255, 255, 255, 0.12) inset, var(--shadow-card-active)',
            },
          }}
          value={value ?? DEFAULT_COLOR}
          isAlphaHidden
          format="hex"
          onBlur={() => {
            if (!isHexColor(value ?? DEFAULT_COLOR)) {
              setValue(theme.value ?? DEFAULT_COLOR)
            }
          }}
          onChange={(color: string) => setValue(color)}
        />
      </ListItem>

      <Expand open={(theme.value || DEFAULT_COLOR) !== value}>
        <div className="flex justify-end">
          <Button
            variant="contained"
            startIcon={<Done />}
            onClick={() => {
              if (isHexColor(value)) {
                theme.upsert(value)
              } else {
                // 如果输入的不是有效的十六进制颜色，则恢复为之前的值
                setValue(theme.value ?? DEFAULT_COLOR)
              }
            }}
          >
            {t('Apply')}
          </Button>
        </div>
      </Expand>
    </>
  )
}

const ExperimentalSwitch = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    setEnabledExperimentalRouter(true)
    navigate({ to: '/experimental/dashboard' })
  }

  return (
    <ListItem sx={{ pl: 0, pr: 0 }}>
      <ListItemText primary="Switch to Experimental UI" />

      <Button variant="contained" onClick={handleClick}>
        Continue
      </Button>
    </ListItem>
  )
}

export const SettingNyanpasuUI = () => {
  const { t } = useTranslation()

  const [onlyIcon, setOnlyIcon] = useAtom(atomIsDrawerOnlyIcon)

  return (
    <BaseCard label={t('User Interface')}>
      <List disablePadding>
        <LanguageSwitch />

        <ThemeSwitch />

        <ThemeColor />

        <SwitchItem
          label={t('Icon Navigation Bar')}
          checked={onlyIcon}
          onChange={() => setOnlyIcon(!onlyIcon)}
        />

        <ExperimentalSwitch />
      </List>
    </BaseCard>
  )
}

export default SettingNyanpasuUI
