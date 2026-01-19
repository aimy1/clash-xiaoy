import { useTranslation } from 'react-i18next'
import { FilledInputProps, TextField } from '@mui/material'
import { alpha } from '@nyanpasu/ui'
import { useLogContext } from './log-provider'

export const LogFilter = () => {
  const { t } = useTranslation()

  const { filterText, setFilterText } = useLogContext()

  const inputProps: Partial<FilledInputProps> = {
    sx: (theme) => ({
      borderRadius: 7,
      backgroundColor: 'rgba(0, 229, 255, 0.1) !important',
      border: '1px solid var(--cyber-glass-border)',
      color: 'var(--cyber-text-main)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(0, 229, 255, 0.15) !important',
        borderColor: 'var(--cyber-primary)',
        boxShadow: '0 0 5px rgba(0, 229, 255, 0.3)',
      },
      '&.Mui-focused': {
         boxShadow: '0 0 10px var(--cyber-primary)',
         borderColor: 'var(--cyber-primary)',
      },
      fieldset: {
        border: 'none',
      },
    }),
  }

  return (
    <TextField
      hiddenLabel
      autoComplete="off"
      spellCheck="false"
      value={filterText}
      placeholder={t('Filter conditions')}
      onChange={(e) => setFilterText(e.target.value)}
      className="!pb-0"
      sx={{ input: { py: 1, fontSize: 14 } }}
      slotProps={{
        input: inputProps,
      }}
    />
  )
}
