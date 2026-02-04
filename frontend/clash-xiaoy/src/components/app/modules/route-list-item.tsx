import { createElement } from 'react'
import { useTranslation } from 'react-i18next'
import { languageQuirks } from '@/utils/language'
import { SvgIconComponent } from '@mui/icons-material'
<<<<<<< HEAD
import { Box, ListItemButton, ListItemIcon } from '@mui/material'
=======
import { Box, ListItemButton, ListItemIcon, Tooltip } from '@mui/material'
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
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
        onlyIcon ? '!mx-auto !size-12 !rounded-xl !p-0 !min-h-0' : '!rounded-xl !py-2.5 !px-4',
        match && 'cyber-box-glow',
        'transition-all duration-300 hover:scale-105'
      )}
      sx={[
        (theme) => ({
          backgroundColor: match
            ? alpha(theme.vars.palette.primary.main, 0.15)
            : 'transparent',
          border: match ? `1px solid ${theme.vars.palette.primary.main}` : '1px solid transparent',
          justifyContent: onlyIcon ? 'center' : 'flex-start',
        }),
        (theme) => ({
          '&:hover': {
            backgroundColor: alpha(theme.vars.palette.primary.main, 0.2),
            boxShadow: `0 0 15px ${alpha(theme.vars.palette.primary.main, 0.5)}`,
            transform: onlyIcon ? 'scale(1.1)' : 'translateX(5px)',
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

<<<<<<< HEAD
  return listItemButton
=======
  return onlyIcon ? (
    <Tooltip title={t(`label_${name}`)}>{listItemButton}</Tooltip>
  ) : (
    listItemButton
  )
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
}

export default RouteListItem
