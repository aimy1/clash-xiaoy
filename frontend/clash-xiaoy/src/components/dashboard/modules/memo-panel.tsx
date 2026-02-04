import { EditNoteOutlined } from '@mui/icons-material'
import { Paper, InputBase, Box } from '@mui/material'
import { useAtom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { NyanpasuStorage } from '@/services/storage'

const dashboardMemoAtom = atomWithStorage<string>(
  'dashboard_memo_text',
  '',
  createJSONStorage(() => NyanpasuStorage)
)

export const MemoPanel = memo(() => {
  const { t } = useTranslation()
  const [text, setText] = useAtom(dashboardMemoAtom)

  return (
    <Paper className="flex !h-full flex-col gap-2 !rounded-3xl p-3 cyber-glass overflow-hidden">
      <div className="flex items-center gap-2 px-1">
        <EditNoteOutlined sx={{ fontSize: 20, color: 'var(--primary)' }} />
        <div className="text-sm font-semibold text-[var(--text-title)]">
          {t('Memo')}
        </div>
      </div>
      
      <Box sx={{ flex: 1, px: 1, pb: 1 }}>
        <InputBase
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('Type something here...')}
          sx={{
            height: '100%',
            alignItems: 'flex-start',
            fontSize: '0.875rem',
            color: 'var(--text-main)',
            '& .MuiInputBase-input': {
              height: '100% !important',
              overflow: 'auto !important'
            }
          }}
        />
      </Box>
    </Paper>
  )
})

export default MemoPanel
