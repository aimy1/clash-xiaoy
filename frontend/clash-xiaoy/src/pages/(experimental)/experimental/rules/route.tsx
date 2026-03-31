import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AppContentScrollArea, useScrollArea } from '@/components/ui/scroll-area'
import { type ClashRule, useClashRules } from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import { createFileRoute } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/(experimental)/experimental/rules')({
  component: RouteComponent,
})

const InnerComponent = ({
  rules,
  isLoading,
  isError,
  errorText,
}: {
  rules: ClashRule[]
  isLoading: boolean
  isError: boolean
  errorText: string | null
}) => {
  const { viewportRef } = useScrollArea()

  if (isLoading) {
    return (
      <div className="px-4 py-10">
        <div className="bg-surface/40 border-outline/40 flex items-center justify-center gap-3 rounded-xl border px-3 py-10 text-sm text-zinc-500">
          <div className="size-4 animate-spin rounded-full border-2 border-zinc-400/60 border-t-transparent" />
          <div>加载规则中...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="px-4 py-10">
        <div className="bg-surface/40 border-outline/40 flex flex-col items-center gap-2 rounded-xl border px-3 py-10 text-center">
          <div className="text-sm font-medium">规则加载失败</div>
          <div className="text-xs text-zinc-500 break-all">
            {errorText || '未知错误'}
          </div>
        </div>
      </div>
    )
  }

  if (rules.length === 0) {
    return (
      <div className="px-4 py-10">
        <div className="bg-surface/40 border-outline/40 flex flex-col items-center gap-2 rounded-xl border px-3 py-10 text-center">
          <div className="text-sm font-medium">暂无规则</div>
          <div className="text-xs text-zinc-500">
            请确认 Clash Core 正在运行，且外部控制接口可用
          </div>
        </div>
      </div>
    )
  }

  const rowVirtualizer = useVirtualizer({
    count: rules.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 72,
    overscan: 5,
    measureElement: (element) => element?.getBoundingClientRect().height,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <div className="px-4 py-4">
      <div
        className="relative flex flex-col"
        data-slot="rules-virtual-list"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const rule = rules[virtualItem.index]

          if (!rule) {
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
              data-slot="rules-virtual-item"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-12 text-xs text-zinc-500 pt-1">
                  {virtualItem.index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-mono break-all text-sm text-primary">
                    {rule.payload || '-'}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
                      {rule.type || '-'}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 break-all">
                      {rule.proxy || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RouteComponent() {
  const { data, isLoading, isFetching, isError, error, refetch } = useClashRules()
  const [filterText, setFilterText] = useState('')

  const rules = useMemo(() => {
    const rawRules = data?.rules ?? []
    const query = filterText.trim().toLowerCase()
    if (!query) {
      return rawRules
    }

    return rawRules.filter((rule) => {
      const payload = (rule.payload ?? '').toLowerCase()
      const type = (rule.type ?? '').toLowerCase()
      const proxy = (rule.proxy ?? '').toLowerCase()
      return (
        payload.includes(query) || type.includes(query) || proxy.includes(query)
      )
    })
  }, [data?.rules, filterText])

  const errorText = isError
    ? (error as { message?: string } | undefined)?.message ?? String(error)
    : null

  return (
    <div className="flex h-full flex-col">
      <div className="border-outline/40 bg-surface/70 flex items-center gap-3 border-b px-4 py-3">
        <div className="flex flex-col">
          <div className="text-sm font-medium">规则</div>
          <div className="text-xs text-zinc-500">
            {isLoading ? '加载中...' : `共 ${data?.rules?.length ?? 0} 条`}
            {filterText.trim() ? `，已筛选 ${rules.length} 条` : ''}
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-[280px] max-w-[50vw]">
          <Input
            variant="outlined"
            label="过滤（payload / type / proxy）"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <Button variant="flat" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '刷新中' : '刷新'}
        </Button>
      </div>

      <AppContentScrollArea className="flex-1">
        <InnerComponent
          rules={rules}
          isLoading={isLoading}
          isError={isError}
          errorText={errorText}
        />
      </AppContentScrollArea>
    </div>
  )
}
