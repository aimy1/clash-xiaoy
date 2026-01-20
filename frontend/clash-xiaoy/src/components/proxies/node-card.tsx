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

  const handleDelayClick = useLockFn(async (e: React.MouseEvent) => {
    e.stopPropagation()
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
        'relative flex flex-col justify-between p-3 transition-all duration-300 cursor-pointer overflow-hidden cyber-glass',
        checked ? 'cyber-box-glow border-neon-primary' : 'hover:border-neon-primary hover:shadow-neon',
        styles.Card
      )}
      sx={{
        backgroundColor: checked ? 'rgba(0, 229, 255, 0.15) !important' : 'rgba(255, 255, 255, 0.05) !important',
        borderColor: checked ? 'var(--cyber-primary) !important' : 'var(--cyber-glass-border) !important',
      }}
      onClick={!disabled ? handleClick : undefined}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <div className="font-bold text-sm truncate pr-2 cyber-text-glow w-full" title={node.name}>
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
      <div className="mt-2 h-1 w-full bg-gray-700/50 rounded-full overflow-hidden">
        <div 
            className={`h-full transition-all duration-500 ${
              delay > 0 
                ? delay < 300 ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' 
                : delay < 800 ? 'bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]' 
                : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]'
                : 'bg-transparent'
            }`} 
            style={{ width: delay > 0 ? '100%' : '0%' }}
        />
      </div>
      
      {checked && (
        <div className="absolute inset-0 border-2 border-[var(--cyber-primary)] rounded-2xl pointer-events-none opacity-50 animate-pulse" />
      )}
    </Paper>
  )
})

export default NodeCard
