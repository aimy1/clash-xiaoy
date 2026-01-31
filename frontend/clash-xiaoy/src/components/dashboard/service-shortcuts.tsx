import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { isObject } from 'lodash-es'
import { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { atomIsDrawer } from '@/store'
import { Box, CircularProgress, Paper, Tooltip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { getCoreStatus, useSystemService } from '@nyanpasu/interface'
import { alpha } from '@nyanpasu/ui'

type Status = {
  label: string
  sx: SxProps<Theme>
}

export const ServiceShortcuts = memo(() => {
  const { t } = useTranslation()

  const {
    query: { data: serviceStatus },
  } = useSystemService()

  // TODO: refactor to use tanstack query
  const coreStatusSWR = useSWR('/coreStatus', getCoreStatus, {
    refreshInterval: 2000,
    revalidateOnFocus: false,
  })

  const status: Status = useMemo(() => {
    switch (serviceStatus?.status) {
      case 'running': {
        return {
          label: t('running'),
          sx: ((theme) => ({
            backgroundColor: alpha(theme.vars.palette.success.light, 0.3),
            ...theme.applyStyles('dark', {
              backgroundColor: alpha(theme.vars.palette.success.dark, 0.3),
            }),
          })) as SxProps<Theme>,
        }
      }

      case 'stopped': {
        return {
          label: t('stopped'),
          sx: ((theme) => ({
            backgroundColor: alpha(theme.vars.palette.error.light, 0.3),
            ...theme.applyStyles('dark', {
              backgroundColor: alpha(theme.vars.palette.error.dark, 0.3),
            }),
          })) as SxProps<Theme>,
        }
      }

      case 'not_installed':
      default: {
        return {
          label: t('not_installed'),
          sx: ((theme) => ({
            backgroundColor: theme.vars.palette.grey[100],
            ...theme.applyStyles('dark', {
              backgroundColor: theme.vars.palette.background.paper,
            }),
          })) as SxProps<Theme>,
        }
      }
    }
  }, [serviceStatus, t])

  const coreStatus: Status = useMemo(() => {
    const status = coreStatusSWR.data || [{ Stopped: null }, 0, 'normal']
    if (
      isObject(status[0]) &&
      Object.prototype.hasOwnProperty.call(status[0], 'Stopped')
    ) {
      const { Stopped } = status[0]
      return {
        label:
          !!Stopped && Stopped.trim()
            ? t('stopped_reason', { reason: Stopped })
            : t('stopped'),
        sx: ((theme) => ({
          backgroundColor: alpha(theme.vars.palette.success.light, 0.3),
          ...theme.applyStyles('dark', {
            backgroundColor: alpha(theme.vars.palette.success.dark, 0.3),
          }),
        })) as SxProps<Theme>,
      }
    }
    return {
      label: t('service_shortcuts.core_started_by', {
        by: t(status[2] === 'normal' ? 'UI' : 'service'),
      }),
      sx: ((theme) => ({
        backgroundColor: alpha(theme.vars.palette.success.light, 0.3),
        ...theme.applyStyles('dark', {
          backgroundColor: alpha(theme.vars.palette.success.dark, 0.3),
        }),
      })) as SxProps<Theme>,
    }
  }, [coreStatusSWR.data, t])

  return (
    <Paper className="flex !h-full flex-col justify-between gap-2 !rounded-3xl p-3 cyber-glass">
      {serviceStatus ? (
        <>
          <div className="px-1 text-center text-sm font-semibold text-[var(--text-title)]">
            {t('service_shortcuts.title')}
          </div>

          <div className="flex w-full flex-col gap-2">
            <Box
              className="flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm"
              sx={status.sx}
            >
              <div className="text-[var(--text-sub)]">
                {t('service_shortcuts.service_status')}
              </div>
              <div className="min-w-0 truncate text-right font-medium">
                {t(status.label)}
              </div>
            </Box>

            <Box
              className="flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm"
              sx={coreStatus.sx}
            >
              <div className="text-[var(--text-sub)]">
                {t('service_shortcuts.core_status')}
              </div>
              <Tooltip
                title={
                  !!coreStatusSWR.data?.[1] &&
                  t('service_shortcuts.last_status_changed_since', {
                    time: dayjs(coreStatusSWR.data[1]).fromNow(),
                  })
                }
              >
                <div className="min-w-0 truncate text-right font-medium">
                  {coreStatus.label}
                </div>
              </Tooltip>
            </Box>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <CircularProgress />

          <div>Loading...</div>
        </div>
      )}
    </Paper>
  )
})

export default ServiceShortcuts
