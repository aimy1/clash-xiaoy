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
        'relative flex flex-col justify-between p-3 cursor-pointer overflow-hidden cyber-glass',
        checked ? 'cyber-box-glow' : undefined,
        styles.Card,
      )}
      sx={{
        borderColor: checked ? 'var(--primary) !important' : 'var(--border) !important',
        boxShadow: checked
          ? 'var(--shadow-card-hover)'
          : undefined,
      }}
      onClick={!disabled ? handleClick : undefined}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <div className="font-bold text-sm truncate pr-2 w-full" title={node.name}>
          {node.name}
        </div>
      </div>

      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
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
        className="mt-2 h-1 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-active)' }}
      >
        <div
          className={cn('h-full', delay > 0 ? undefined : 'opacity-0')}
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
          }}
        />
      </div>
    </Paper>
  )
})

export default NodeCard
