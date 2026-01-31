import { useTranslation } from 'react-i18next'
import { BaseDialog, BaseDialogProps } from '@nyanpasu/ui'
import { Box, Card, CardContent, IconButton, Typography, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'

interface HiddenItemsDialogProps extends Omit<BaseDialogProps, 'title'> {
  hiddenItems: string[]
  onAdd: (id: string) => void
  onAddAll: () => void
}

export default function HiddenItemsDialog({
  open,
  onClose,
  hiddenItems,
  onAdd,
  onAddAll,
  ...props
}: HiddenItemsDialogProps) {
  const { t } = useTranslation()

  return (
    <BaseDialog
      title={t('Add Card')}
      open={open}
      onClose={onClose}
      ok={hiddenItems.length > 0 ? t('Add All') : undefined}
      onOk={hiddenItems.length > 0 ? onAddAll : undefined}
      contentStyle={{ minWidth: '450px' }}
      {...props}
    >
      {hiddenItems.length > 0 ? (
        <Grid container spacing={2}>
          {hiddenItems.map((id) => (
            <Grid item xs={6} key={id}>
              <Card 
                variant="outlined" 
                sx={{ 
                  borderRadius: '12px',
                  borderColor: 'rgba(128, 128, 128, 0.15)',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    borderColor: 'rgba(128, 128, 128, 0.3)',
                  }
                }}
              >
                <CardContent sx={{ p: '8px 12px !important', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                    {t(id)}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => onAdd(id)}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', backgroundColor: 'transparent' }
                    }}
                  >
                    <Add fontSize="small" sx={{ fontSize: 16 }} />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className="flex h-32 flex-col items-center justify-center gap-2 text-zinc-500">
          <Typography variant="body2">{t('No items to add')}</Typography>
        </Box>
      )}
    </BaseDialog>
  )
}
