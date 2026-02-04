import { SystemUpdateOutlined, UpdateOutlined } from '@mui/icons-material'
import { Paper, Box, Button, CircularProgress, Typography } from '@mui/material'
import { useSetAtom, useAtomValue } from 'jotai'
import { useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { checkUpdate, useUpdaterPlatformSupported } from '@/hooks/use-updater'
import { UpdaterInstanceAtom } from '@/store/updater'
import { Notice } from '@/components/base'
import { getVersion } from '@tauri-apps/api/app'

export const UpdaterPanel = memo(() => {
  const { t } = useTranslation()
  const setUpdaterInstance = useSetAtom(UpdaterInstanceAtom)
  const isSupported = useUpdaterPlatformSupported()
  const [loading, setLoading] = useState(false)
  const [currentVersion, setCurrentVersion] = useState<string>('')

  useEffect(() => {
    getVersion().then(setCurrentVersion).catch(console.error)
  }, [])

  const handleCheck = async () => {
    setLoading(true)
    try {
      const update = await checkUpdate()
      if (update) {
        setUpdaterInstance(update)
      } else {
        Notice.info(t('You are already using the latest version'))
      }
    } catch (e) {
      Notice.error(t('Failed to check for updates'))
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper className="flex !h-full flex-col gap-2 !rounded-3xl p-3 cyber-glass overflow-hidden">
      <div className="flex items-center gap-2 px-1">
        <SystemUpdateOutlined sx={{ fontSize: 20, color: 'var(--primary)' }} />
        <div className="text-sm font-semibold text-[var(--text-title)]">
          {t('Software Update')}
        </div>
      </div>
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <div className="flex flex-col items-center gap-1">
          <Typography variant="caption" sx={{ color: 'var(--text-sub)', fontSize: '0.75rem' }}>
            {t('Current Version')}
          </Typography>
          <Typography variant="body2" sx={{ fontLines: '1', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--primary)' }}>
            {currentVersion || '...'}
          </Typography>
        </div>

        <Button
          variant="contained"
          size="small"
          onClick={handleCheck}
          disabled={loading || !isSupported}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <UpdateOutlined />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            px: 3,
            backgroundColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary-dark)',
            }
          }}
        >
          {loading ? t('Checking...') : t('Check for Updates')}
        </Button>

        {!isSupported && (
          <Typography variant="caption" sx={{ color: 'error.main', fontSize: '0.7rem', textAlign: 'center' }}>
            {t('Update not supported on this platform')}
          </Typography>
        )}
      </Box>
    </Paper>
  )
})

export default UpdaterPanel
