import { useLockFn } from 'ahooks'
import { CSSProperties, memo, useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { ClashProxiesQueryProxyItem } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import DelayChip from './delay-chip'
import FeatureChip from './feature-chip'
import styles from './node-card.module.scss'
import { filterDelay } from './utils'

export const NodeCard = memo(function NodeCard({
  node,
  now,
  disabled,
  style,
}: {
  node: ClashProxiesQueryProxyItem
  now?: string | null
  disabled?: boolean
  style?: CSSProperties
}) {
  const delay = useMemo(() => filterDelay(node.history), [node.history])

  const checked = node.name === now

  const handleDelayClick = useLockFn(async () => {
    await node.mutateDelay()
  })

  const handleClick = useLockFn(async () => {
    await node.mutateSelect()
  })

  return (
    <Paper
      elevation={0}
      style={style}
      className={cn(
        'cyber-glass ios-motion ios-pressable relative flex cursor-pointer flex-col justify-between overflow-hidden p-3',
        checked ? 'cyber-box-glow' : undefined,
        styles.Card,
      )}
      sx={{
        borderColor: checked
          ? 'var(--primary) !important'
          : 'var(--cyber-glass-border) !important',
        boxShadow: checked
          ? '0 1px 0 rgba(255, 255, 255, 0.14) inset, var(--shadow-card-hover), var(--glow-primary)'
          : undefined,
      }}
      onClick={!disabled ? handleClick : undefined}
    >
      <div className="mb-2 flex w-full items-start justify-between">
        <div
          className="cyber-text-glow w-full truncate pr-2 text-sm font-bold"
          title={node.name}
        >
          {node.name}
        </div>
      </div>

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="flex gap-1">
          <FeatureChip label={node.type} />
          {node.udp && <FeatureChip label="UDP" />}
        </div>

        <DelayChip
          className={styles.DelayChip}
          delay={delay}
          onClick={handleDelayClick}
        />
      </Box>

      {/* Signal Bar Visual */}
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--bg-active)' }}
      >
        <div
          className={cn(
            'ios-signal-fill h-full',
            delay > 0 ? undefined : 'opacity-0',
          )}
          style={{
            width: delay > 0 ? '100%' : '0%',
            backgroundColor:
              delay > 0
                ? delay < 300
                  ? 'var(--success)'
                  : delay < 800
                    ? 'var(--warning)'
                    : 'var(--danger)'
                : 'transparent',
            boxShadow:
              delay > 0
                ? delay < 300
                  ? '0 0 10px rgba(34, 197, 94, 0.35)'
                  : delay < 800
                    ? '0 0 10px rgba(245, 158, 11, 0.35)'
                    : '0 0 10px rgba(239, 68, 68, 0.35)'
                : undefined,
          }}
        />
      </div>
    </Paper>
  )
})

export default NodeCard
