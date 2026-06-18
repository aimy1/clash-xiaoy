import { ReactNode } from 'react'
import { Public } from '@mui/icons-material'
import { cn } from '@nyanpasu/ui'
import { motion } from 'framer-motion'

export interface ContentDisplayProps {
  className?: string
  message?: string
  children?: ReactNode
  icon?: ReactNode
}

export const ContentDisplay = ({
  message,
  children,
  className,
  icon,
}: ContentDisplayProps) => (
  <div
    className={cn(
      'absolute top-0 left-0 flex h-full w-full items-center justify-center p-6',
      className,
    )}
  >
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 text-center max-w-md p-8 rounded-3xl border border-zinc-200/50 bg-white/20 backdrop-blur-md shadow-xl dark:border-zinc-800/40 dark:bg-black/25"
    >
      {children || (
        <>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="flex items-center justify-center p-4 rounded-2xl bg-primary-50/10"
            style={{ color: 'var(--primary)' }}
          >
            {icon || <Public sx={{ fontSize: 56, opacity: 0.8 }} />}
          </motion.div>

          <div className="flex flex-col gap-1 mt-2">
            <h4 className="text-base font-semibold text-[var(--text-title)]">
              {message}
            </h4>
            <p className="text-xs text-[var(--text-sub)] max-w-xs leading-normal">
              如数据未正确加载，请确认内核服务是否已正常启动并处于运行状态。
            </p>
          </div>
        </>
      )}
    </motion.div>
  </div>
)

export default ContentDisplay
