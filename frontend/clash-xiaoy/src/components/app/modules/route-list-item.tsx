import { createElement } from 'react'
import { useTranslation } from 'react-i18next'
import { languageQuirks } from '@/utils/language'
import { SvgIconComponent } from '@mui/icons-material'
import { Box, ListItemButton, ListItemIcon } from '@mui/material'
import { useSetting } from '@nyanpasu/interface'
import { alpha, cn } from '@nyanpasu/ui'
import { useLocation, useMatch, useNavigate } from '@tanstack/react-router'

export const RouteListItem = ({
  name,
  path,
  icon,
  onlyIcon,
}: {
  name: string
  path: string
  icon: SvgIconComponent
  onlyIcon?: boolean
}) => {
  const { t } = useTranslation()

  const location = useLocation()

  const match = location.pathname === path

  const navigate = useNavigate()

  const { value: language } = useSetting('language')

  const listItemButton = (
    <ListItemButton
      className={cn(
        onlyIcon
          ? '!mx-auto !size-12 !min-h-0 !rounded-xl !p-0'
          : '!rounded-xl !px-4 !py-2.5',
        match && 'cyber-box-glow',
        'ios-motion',
      )}
      sx={[
        (theme) => ({
          backgroundColor: match
            ? alpha(theme.vars.palette.primary.main, 0.15)
            : 'transparent',
          border: match
            ? `1px solid ${theme.vars.palette.primary.main}`
            : '1px solid transparent',
          justifyContent: onlyIcon ? 'center' : 'flex-start',
          transition:
            'transform var(--motion-duration-medium) var(--motion-ease-ios), background-color var(--motion-duration-medium) var(--motion-ease-ios), box-shadow var(--motion-duration-medium) var(--motion-ease-ios)',
          willChange: 'transform',
        }),
        (theme) => ({
          '&:hover': {
            backgroundColor: alpha(theme.vars.palette.primary.main, 0.14),
            boxShadow: `0 12px 32px ${alpha(theme.vars.palette.primary.main, 0.18)}`,
            transform: onlyIcon ? 'translateY(-1px)' : 'translateX(4px)',
          },
          '&:active': {
            transform: onlyIcon
              ? 'translateY(0) scale(0.985)'
              : 'translateX(0) scale(0.985)',
            transitionTimingFunction: 'var(--motion-ease-spring)',
            transitionDuration: 'var(--motion-duration-fast)',
          },
        }),
      ]}
      onClick={() => {
        navigate({
          to: path,
        })
      }}
    >
      <ListItemIcon className={cn(onlyIcon ? '!min-w-0' : '!min-w-[40px]')}>
        {createElement(icon, {
          sx: (theme) => ({
            fill: match ? theme.vars.palette.primary.main : undefined,
          }),
          className: onlyIcon ? '!size-6' : '!size-6',
        })}
      </ListItemIcon>
      {!onlyIcon && (
        <Box
          className={cn(
            'w-full pt-1 pb-1 text-nowrap',
            language && languageQuirks[language].drawer.itemClassNames,
          )}
          sx={(theme) => ({
            color: match ? theme.vars.palette.primary.main : undefined,
          })}
        >
          {t(`label_${name}`)}
        </Box>
      )}
    </ListItemButton>
  )

  return listItemButton
}

export default RouteListItem
