import { useTranslation } from 'react-i18next'
import { useSetting } from '@nyanpasu/interface'
import { SwitchItem } from '@nyanpasu/ui'

const BreakWhenProxyChangeSetting = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('break_when_proxy_change' as any)

  return (
    <SwitchItem
      label={t('Interrupt connections when proxy changes')}
      checked={value !== 'none'}
      onChange={() => {
        if (value === 'none') {
          upsert('all' as any)
        } else {
          upsert('none' as any)
        }
      }}
    />
  )
}

const BreakWhenProfileChangeSetting = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('break_when_profile_change' as any)

  return (
    <SwitchItem
      label={t('Interrupt connections when profile changes')}
      checked={value === true}
      onChange={() => {
        if (value === true) {
          upsert(false as any)
        } else {
          upsert(true as any)
        }
      }}
    />
  )
}

const BreakWhenModeChangeSetting = () => {
  const { t } = useTranslation()
  const { value, upsert } = useSetting('break_when_mode_change' as any)

  return (
    <SwitchItem
      label={t('Interrupt connections when mode changes')}
      checked={value === true}
      onChange={() => {
        if (value === true) {
          upsert(false as any)
        } else {
          upsert(true as any)
        }
      }}
    />
  )
}

export {
  BreakWhenProxyChangeSetting,
  BreakWhenProfileChangeSetting,
  BreakWhenModeChangeSetting,
}
