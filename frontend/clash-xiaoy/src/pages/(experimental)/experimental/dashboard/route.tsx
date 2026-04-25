import { useCallback, useEffect, useMemo, useState } from 'react'
import TrafficCard from '@/components/dashboard/traffic-card'
import {
  SystemProxyButton,
  TunModeButton,
} from '@/components/settings/system-proxy'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AppContentScrollArea } from '@/components/ui/scroll-area'
import { useVisibility } from '@/hooks/use-visibility'
import parseTraffic from '@/utils/parse-traffic'
import {
  MAX_TRAFFIC_HISTORY,
  useClashConnections,
  useClashProxies,
  useClashTraffic,
  useClashWSContext,
  useIPSB,
  openThat,
  useProxyMode,
  useSetting,
} from '@nyanpasu/interface'
import { cn } from '@nyanpasu/ui'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(experimental)/experimental/dashboard')({
  component: RouteComponent,
})

type GithubRelease = {
  tag_name: string
  name?: string
  html_url: string
  published_at: string
}

function RouteComponent() {
  const navigate = useNavigate()
  const visible = useVisibility()
  const { setRecordTraffic } = useClashWSContext()
  useEffect(() => {
    setRecordTraffic(visible)
  }, [setRecordTraffic, visible])

  const { data: clashTraffic } = useClashTraffic()
  const {
    query: { data: clashConnections },
  } = useClashConnections()
  const {
    data: ipData,
    mutate: refreshIP,
    isValidating: ipRefreshing,
  } = useIPSB()

  const { data: proxies } = useClashProxies()
  const { value: proxyMode, upsert: updateProxyMode } = useProxyMode()
  const systemProxy = useSetting('enable_system_proxy')
  const tunMode = useSetting('enable_tun_mode')

  const padData = useMemo(
    () =>
      (data: (number | undefined)[] = [], max: number) =>
        Array(Math.max(0, max - data.length))
          .fill(0)
          .concat(data.slice(-max)),
    [],
  )

  const downData = useMemo(
    () =>
      padData(
        clashTraffic?.map((item) => item.down),
        MAX_TRAFFIC_HISTORY,
      ),
    [clashTraffic, padData],
  )

  const upData = useMemo(
    () =>
      padData(
        clashTraffic?.map((item) => item.up),
        MAX_TRAFFIC_HISTORY,
      ),
    [clashTraffic, padData],
  )

  const activeProxyMode = useMemo(() => {
    const current = Object.entries(proxyMode).find(
      ([, enabled]) => enabled,
    )?.[0]
    return current ?? 'rule'
  }, [proxyMode])

  const currentGroup = useMemo(() => {
    if (!proxies) return null

    if (proxyMode.direct) {
      return null
    }

    return proxyMode.global ? proxies.global : (proxies.groups?.[0] ?? null)
  }, [proxies, proxyMode.direct, proxyMode.global])

  const currentNode = useMemo(() => {
    if (!currentGroup) return null

    const nodeName = currentGroup.now
    const node = currentGroup.all?.find((n) => n.name === nodeName)
    return node ?? null
  }, [currentGroup])

  const currentDelay = useMemo(() => {
    if (!currentNode?.history?.length) return 0
    return currentNode.history[currentNode.history.length - 1].delay ?? 0
  }, [currentNode])

  const currentNodeLabel = proxyMode.direct
    ? 'DIRECT'
    : (currentNode?.name ?? '未选择')

  const downTotal = clashConnections?.at(-1)?.downloadTotal
  const upTotal = clashConnections?.at(-1)?.uploadTotal
  const activeConnections = clashConnections?.at(-1)?.connections?.length ?? 0
  const [latestRelease, setLatestRelease] = useState<GithubRelease | null>(null)
  const [releaseLoading, setReleaseLoading] = useState(false)
  const [releaseError, setReleaseError] = useState('')

  const refreshLatestRelease = useCallback(async () => {
    setReleaseLoading(true)
    setReleaseError('')
    try {
      const resp = await fetch(
        'https://api.github.com/repos/aimy1/clash-xiaoy/releases/latest',
      )
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`)
      }
      const data = (await resp.json()) as GithubRelease
      setLatestRelease(data)
    } catch (error) {
      setReleaseError(error instanceof Error ? error.message : 'unknown')
    } finally {
      setReleaseLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshLatestRelease()
  }, [refreshLatestRelease])

  return (
    <AppContentScrollArea>
      <div className="h-dvh p-4 sm:p-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TrafficCard
              className="min-h-44 lg:col-span-2"
              downData={downData}
              upData={upData}
              downTotal={downTotal}
              upTotal={upTotal}
              visible={visible}
            />

            <Card className={cn('cyber-glass cyber-box-glow')}>
              <CardContent className="gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">当前节点</div>
                  <Button
                    className="h-8 px-3"
                    variant="basic"
                    onClick={() => navigate({ to: '/experimental/proxies' })}
                  >
                    切换
                  </Button>
                </div>
                <div
                  className="truncate text-lg font-bold tabular-nums"
                  title={currentNodeLabel}
                >
                  {currentNodeLabel}
                </div>
                <div className="text-on-surface-variant flex items-center justify-between text-sm">
                  <div>延迟</div>
                  <div className="tabular-nums">
                    {proxyMode.direct
                      ? '-'
                      : currentDelay > 0
                        ? `${currentDelay} ms`
                        : 'Timeout'}
                  </div>
                </div>
                <div className="text-on-surface-variant flex items-center justify-between text-sm">
                  <div>节点类型</div>
                  <div className="uppercase tabular-nums">
                    {currentNode?.type ?? '-'}
                  </div>
                </div>
                <Button
                  className="h-8"
                  variant="flat"
                  onClick={() => {
                    currentGroup?.mutateDelay()
                  }}
                >
                  节点测速
                </Button>
              </CardContent>
            </Card>

            <Card className={cn('cyber-glass cyber-box-glow')}>
              <CardContent className="gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">代理模式</div>
                  <div className="text-on-surface-variant text-xs uppercase">
                    {activeProxyMode}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['rule', 'global', 'direct'] as const).map((mode) => (
                    <Button
                      key={mode}
                      className="h-8 min-w-0 px-0 text-xs uppercase"
                      variant={activeProxyMode === mode ? 'flat' : 'basic'}
                      onClick={() => {
                        updateProxyMode(mode)
                      }}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
                <div className="text-on-surface-variant text-sm">
                  点击可直接切换代理模式
                </div>
              </CardContent>
            </Card>

            <Card className={cn('cyber-glass cyber-box-glow lg:col-span-3')}>
              <CardContent className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="mr-auto text-sm font-semibold">
                    系统代理与 TUN
                  </div>
                  <div className="bg-surface rounded-full px-3 py-1 text-xs">
                    系统代理: {systemProxy.value ? 'ON' : 'OFF'}
                  </div>
                  <div className="bg-surface rounded-full px-3 py-1 text-xs">
                    TUN: {tunMode.value ? 'ON' : 'OFF'}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <SystemProxyButton />
                  <TunModeButton />
                </div>
              </CardContent>
            </Card>

            <Card className={cn('cyber-glass cyber-box-glow lg:col-span-3')}>
              <CardContent className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="mr-auto text-sm font-semibold">软件更新</div>
                  <div className="bg-surface rounded-full px-3 py-1 text-xs">
                    最新: {latestRelease?.tag_name ?? '--'}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">Release</div>
                    <div className="truncate text-sm font-medium">
                      {latestRelease?.name || latestRelease?.tag_name || '-'}
                    </div>
                  </div>

                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">发布时间</div>
                    <div className="truncate text-sm font-medium tabular-nums">
                      {latestRelease?.published_at
                        ? new Date(latestRelease.published_at).toLocaleString(
                            'zh-CN',
                            { hour12: false },
                          )
                        : '-'}
                    </div>
                  </div>

                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">状态</div>
                    <div className="truncate text-sm font-medium">
                      {releaseError ? `获取失败: ${releaseError}` : '可检查更新'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button
                    className="h-9"
                    variant="flat"
                    loading={releaseLoading}
                    onClick={() => {
                      refreshLatestRelease()
                    }}
                  >
                    检查最新版本
                  </Button>
                  <Button
                    className="h-9"
                    variant="basic"
                    onClick={() => {
                      openThat(
                        latestRelease?.html_url ??
                          'https://github.com/aimy1/clash-xiaoy/releases',
                      )
                    }}
                  >
                    前往 GitHub 下载更新
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={cn('cyber-glass cyber-box-glow')}>
              <CardContent className="gap-2">
                <div className="text-sm font-semibold">流量统计</div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-on-surface-variant">下载总量</div>
                  <div className="font-semibold tabular-nums">
                    {parseTraffic(downTotal).join(' ')}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-on-surface-variant">上传总量</div>
                  <div className="font-semibold tabular-nums">
                    {parseTraffic(upTotal).join(' ')}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-on-surface-variant">当前连接数</div>
                  <div className="font-semibold tabular-nums">
                    {activeConnections}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cn('cyber-glass cyber-box-glow lg:col-span-2')}>
              <CardContent className="gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">当前节点 IP</div>
                  <Button
                    className="h-8 px-3"
                    variant="basic"
                    loading={ipRefreshing}
                    onClick={() => {
                      refreshIP()
                    }}
                  >
                    刷新
                  </Button>
                </div>
                <div className="text-2xl font-bold tabular-nums">
                  {ipData?.ip ?? '--.--.--.--'}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">
                      国家/地区
                    </div>
                    <div className="truncate text-sm font-medium">
                      {ipData?.country ?? '-'}
                    </div>
                  </div>
                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">
                      运营组织
                    </div>
                    <div className="truncate text-sm font-medium">
                      {ipData?.organization ?? '-'}
                    </div>
                  </div>
                  <div className="bg-surface/70 rounded-xl p-2">
                    <div className="text-on-surface-variant text-xs">ASN</div>
                    <div className="truncate text-sm font-medium tabular-nums">
                      {ipData?.asn ? `AS${ipData.asn}` : '-'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppContentScrollArea>
  )
}
