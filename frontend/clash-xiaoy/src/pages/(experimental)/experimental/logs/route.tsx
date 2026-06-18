import { useEffect, useMemo, useState } from 'react'
import {
  AppContentScrollArea,
  useScrollArea,
} from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useClashLogs } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import { createFileRoute } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import LogLevelBadge from './_modules/log-level-badge'

export const Route = createFileRoute('/(experimental)/experimental/logs')({
  component: RouteComponent,
})

const InnerComponent = ({
  logs,
}: {
  logs: { type: string; time?: string; payload: string }[]
}) => {
  const { isBottom, viewportRef } = useScrollArea()

  if (logs.length === 0) {
    return (
      <div className="px-4 py-10">
        <div className="bg-surface/40 border-outline/40 flex flex-col items-center gap-2 rounded-xl border px-3 py-10 text-center">
          <div className="text-sm font-medium">暂无日志</div>
          <div className="text-xs text-zinc-500">
            若你刚启动程序，可先进入仪表盘/代理/连接等页面产生一些日志
          </div>
        </div>
      </div>
    )
  }

  const rowVirtualizer = useVirtualizer({
    count: logs.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 64,
    overscan: 5,
    measureElement: (element) => element?.getBoundingClientRect().height,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    if (isBottom && logs.length > 0) {
      rowVirtualizer.scrollToIndex(logs.length - 1, {
        align: 'end',
        behavior: 'smooth',
      })
    }
  }, [logs, isBottom, rowVirtualizer])

  return (
    <div className="px-4 py-4">
      <div
        className="relative flex flex-col"
        data-slot="logs-virtual-list"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const log = logs[virtualItem.index]

          if (!log) {
            return null
          }

          return (
            <div
              key={virtualItem.key}
              ref={rowVirtualizer.measureElement}
              className={cn(
                'absolute top-0 left-0 w-full select-text',
                'rounded-xl border border-outline/30 bg-surface/50',
                'px-3 py-2',
                'transition-colors hover:bg-surface-variant/40',
              )}
              data-index={virtualItem.index}
              data-slot="logs-virtual-item"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="min-w-20 text-xs text-zinc-500">
                  {log.time || '--'}
                </span>
                <LogLevelBadge className="text-xs">{log.type}</LogLevelBadge>
              </div>

              <div className="mt-1 font-mono text-sm break-all">
                {log.payload}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RouteComponent() {
  const { query, clean, status, enable, disable } = useClashLogs()
  const logs = query.data ?? []
  const isLoading = query.isLoading
  const isFetching = query.isFetching

  const [filterText, setFilterText] = useState('')

  const filteredLogs = useMemo(() => {
    const queryText = filterText.trim().toLowerCase()
    if (!queryText) {
      return logs
    }

    return logs.filter((log) => {
      const payload = (log.payload ?? '').toLowerCase()
      const type = (log.type ?? '').toLowerCase()
      return payload.includes(queryText) || type.includes(queryText)
    })
  }, [logs, filterText])

  return (
    <div className="flex h-full flex-col">
      <div className="border-outline/40 bg-surface/70 flex items-center gap-3 border-b px-4 py-3">
        <div className="flex flex-col">
          <div className="text-sm font-medium">日志</div>
          <div className="text-xs text-zinc-500">
            {isLoading ? '加载中...' : `共 ${logs.length} 条`}
            {filterText.trim() ? `，已筛选 ${filteredLogs.length} 条` : ''}
            {status ? ' · 记录中' : ' · 已暂停'}
            {isFetching ? ' · 更新中' : ''}
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-[280px] max-w-[50vw]">
          <Input
            variant="outlined"
            label="过滤（payload / type）"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <Button
          variant="flat"
          onClick={() => (status ? disable() : enable())}
        >
          {status ? '暂停' : '继续'}
        </Button>

        <Button
          variant="flat"
          onClick={() => clean.mutate()}
          disabled={logs.length === 0 || clean.isPending}
        >
          {clean.isPending ? '清空中' : '清空'}
        </Button>
      </div>

      <AppContentScrollArea className="flex-1">
        <InnerComponent logs={filteredLogs} />
      </AppContentScrollArea>
    </div>
  )
}
