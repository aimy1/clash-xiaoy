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
      backgroundColor: alpha(theme.palette.primary.main, 0.1) + ' !important',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      color: theme.palette.text.primary,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.15) + ' !important',
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 5px ${alpha(theme.palette.primary.main, 0.3)}`,
      },
      '&.Mui-focused': {
        boxShadow: `0 0 10px ${theme.palette.primary.main}`,
        borderColor: theme.palette.primary.main,
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
