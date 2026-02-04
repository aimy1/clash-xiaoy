import { CalendarMonthOutlined, TodayOutlined } from '@mui/icons-material'
import { Paper, Box, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import dayjs, { Dayjs } from 'dayjs'
import { useState, useMemo, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

// International holiday map (MM-DD) -> Translation Key
const HOLIDAYS: Record<string, string> = {
  '01-01': 'holiday.new_year',
  '02-14': 'holiday.valentines',
  '03-08': 'holiday.womens_day',
  '03-17': 'holiday.st_patricks',
  '04-01': 'holiday.april_fools',
  '04-22': 'holiday.earth_day',
  '05-01': 'holiday.workers_day',
  '06-01': 'holiday.childrens_day',
  '06-05': 'holiday.env_day',
  '10-31': 'holiday.halloween',
  '12-24': 'holiday.christmas_eve',
  '12-25': 'holiday.christmas',
  '12-31': 'holiday.new_years_eve',
}

interface CustomDayProps extends PickersDayProps<Dayjs> {
  onRightClick: (event: React.MouseEvent, date: Dayjs) => void
}

const CustomDay = memo((props: CustomDayProps) => {
  const { t } = useTranslation()
  const { day, onRightClick, ...other } = props
  const dateStr = day.format('MM-DD')
  const holidayKey = HOLIDAYS[dateStr]

  return (
    <Box 
      sx={{ position: 'relative' }} 
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick(e, day)
      }}
    >
      <PickersDay {...other} day={day} />
      {holidayKey && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '9px',
            color: 'error.main',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            fontWeight: 'bold',
            letterSpacing: '-0.5px'
          }}
        >
          {t(holidayKey)}
        </Typography>
      )}
    </Box>
  )
})

export const CalendarPanel = memo(() => {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
    date: Dayjs
  } | null>(null)

  const handleBackToToday = useCallback(() => {
    setValue(dayjs())
  }, [])

  const handleRightClick = useCallback((event: React.MouseEvent, date: Dayjs) => {
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      date,
    })
  }, [])

  const handleClose = useCallback(() => {
    setContextMenu(null)
  }, [])

  const handleSelectDate = useCallback(() => {
    if (contextMenu) {
      setValue(contextMenu.date)
    }
    handleClose()
  }, [contextMenu, handleClose])

  const renderDay = useCallback((props: CustomDayProps) => (
    <CustomDay {...props} onRightClick={handleRightClick} />
  ), [handleRightClick])

  return (
    <Paper className="flex !h-full flex-col gap-2 !rounded-3xl p-3 cyber-glass overflow-hidden">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <CalendarMonthOutlined sx={{ fontSize: 20, color: 'var(--primary)' }} />
          <div className="text-sm font-semibold text-[var(--text-title)]">
            {t('Calendar')}
          </div>
        </div>
        <Tooltip title={t('Back to Today')}>
          <IconButton size="small" onClick={handleBackToToday} sx={{ color: 'var(--primary)', opacity: 0.8 }}>
            <TodayOutlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </div>
      
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          '& .MuiDateCalendar-root': {
            width: '100%',
            height: '100%',
            maxHeight: 'none'
          },
          '& .MuiPickersCalendarHeader-root': {
            marginTop: 0,
            paddingLeft: '12px',
            paddingRight: '8px'
          },
          '& .MuiPickersDay-today': {
            border: '1px solid var(--primary) !important',
          }
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language === 'zh-CN' ? 'zh-cn' : i18n.language}>
          <DateCalendar 
            value={value} 
            onChange={(newValue) => setValue(newValue)}
            slots={{
              day: renderDay
            }}
          />
        </LocalizationProvider>
      </Box>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleSelectDate}>
          <ListItemText>{t('Select Date')}: {contextMenu?.date.format('YYYY-MM-DD')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleBackToToday}>
          <ListItemText>{t('Back to Today')}</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  )
})

export default CalendarPanel
