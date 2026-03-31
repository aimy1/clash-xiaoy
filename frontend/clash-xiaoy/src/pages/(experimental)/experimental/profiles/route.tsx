import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AppContentScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@nyanpasu/ui'
import { useProfile } from '@nyanpasu/interface'
import { ChangeEvent, useMemo, useState } from 'react'

export const Route = createFileRoute('/(experimental)/experimental/profiles')({
  component: RouteComponent,
})

function RouteComponent() {
  const { query, create, upsert, drop } = useProfile()
  const [subscribeUrl, setSubscribeUrl] = useState('')

  const items = query.data?.items ?? []
  const current = query.data?.current ?? []
  const activeUid = current[0]

  const stat = useMemo(() => {
    const latest = items.reduce((acc, item) => Math.max(acc, item.updated || 0), 0)
    const latestText = latest
      ? new Date(latest * 1000).toLocaleString()
      : '--'
    const activeName =
      items.find((item) => item.uid === activeUid)?.name || '未选择'
    return {
      total: items.length,
      activeName,
      latestText,
    }
  }, [activeUid, items])

  const isUrlValid = /^https?:\/\/\S+$/i.test(subscribeUrl.trim())

  return (
    <AppContentScrollArea className="h-full">
      <div className="flex flex-col gap-5 p-5 sm:p-6 lg:p-8">
        <Card className="bg-surface/70 border-outline/40 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight">配置文件</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                在这里管理订阅、导入本地配置与快速切换配置文件
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="flat"
                onClick={() =>
                  create.mutate({
                    type: 'manual',
                    data: {
                      item: {
                        type: 'local',
                        uid: crypto.randomUUID(),
                        name: `本地配置-${Date.now()}`,
                        file: 'profiles/local.yaml',
                        desc: '由实验页面创建',
                        updated: Math.floor(Date.now() / 1000),
                        symlinks: null,
                      },
                      fileData: '',
                    },
                  })
                }
                disabled={create.isPending}
                className="min-w-[100px]"
              >
                {create.isPending ? '创建中...' : '新建配置'}
              </Button>
              <Button 
                variant="raised" 
                onClick={() => query.refetch()}
                className="min-w-[100px]"
              >
                刷新列表
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface/60 border-outline/30 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="text-base font-semibold">通过链接导入配置</div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 min-w-0">
                <Input
                  variant="outlined"
                  label="订阅链接"
                  value={subscribeUrl}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setSubscribeUrl(event.target.value)
                  }
                />
              </div>
              <Button
                variant="raised"
                disabled={!isUrlValid || create.isPending}
                onClick={() =>
                  create.mutate(
                    {
                      type: 'url',
                      data: {
                        url: subscribeUrl.trim(),
                        option: {
                          user_agent: null,
                          with_proxy: null,
                          self_proxy: null,
                          update_interval: null,
                        },
                      },
                    },
                    {
                      onSuccess: () => setSubscribeUrl(''),
                    },
                  )
                }
                className="sm:w-auto w-full"
              >
                {create.isPending ? '导入中...' : '导入并生成配置'}
              </Button>
            </div>
            {!isUrlValid && subscribeUrl.length > 0 && (
              <div className="text-xs text-zinc-500 -mt-2">
                请输入有效链接（以 http:// 或 https:// 开头）
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-surface/60 border-outline/30 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-1.5 p-4">
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">总配置数</div>
              <div className="text-3xl font-bold tracking-tight">{stat.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30 shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-1.5 p-4">
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">当前使用</div>
              <div className="text-lg font-semibold line-clamp-1">{stat.activeName}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
            <CardContent className="flex flex-col gap-1.5 p-4">
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">最后更新</div>
              <div className="text-base font-medium line-clamp-1">{stat.latestText}</div>
            </CardContent>
          </Card>
        </div>

        {items.length === 0 ? (
          <Card className="bg-surface/50 border-outline/30 shadow-sm">
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="text-2xl font-semibold">暂无配置文件</div>
                <p className="max-w-md text-sm text-zinc-500 leading-relaxed">
                  你可以通过订阅链接或本地文件导入配置，导入后会在此处展示并支持切换。
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="flat" onClick={() => query.refetch()}>
                  重新获取
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-surface/50 border-outline/30 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-4">
              {items.map((item) => {
                const active = activeUid === item.uid
                return (
                  <div
                    key={item.uid}
                    className={cn(
                      'group rounded-xl border border-outline/40 bg-surface/70 p-4 transition-all hover:shadow-md',
                      active && 'border-primary/50 bg-surface-variant/50 shadow-sm',
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="text-base font-semibold truncate">{item.name}</div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {item.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-zinc-500 truncate">
                            {item.file}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          更新时间：{new Date(item.updated * 1000).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
                        <Button
                          variant={active ? 'stroked' : 'flat'}
                          disabled={active || upsert.isPending}
                          onClick={() => upsert.mutate({ current: [item.uid] })}
                          className="min-w-[88px]"
                        >
                          {active ? '当前使用' : '设为当前'}
                        </Button>
                        <Button
                          variant="basic"
                          disabled={drop.isPending}
                          onClick={() => drop.mutate(item.uid)}
                          className="min-w-[60px]"
                        >
                          删除
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </AppContentScrollArea>
  )
}
