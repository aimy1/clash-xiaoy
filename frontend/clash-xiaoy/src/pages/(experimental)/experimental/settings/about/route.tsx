import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import packageJson from '~/package.json'
import { cn } from '@nyanpasu/ui'
import {
  collectEnvs,
  openThat,
  useClashInfo,
  useClashVersion,
  type EnvInfos,
} from '@nyanpasu/interface'
import {
  SettingsTitle,
  SettingsTitlePlaceholder,
} from '../_modules/settings-title'

export const Route = createFileRoute(
  '/(experimental)/experimental/settings/about',
)({
  component: RouteComponent,
})

const safeOpen = async (url: string) => {
  try {
    await openThat(url)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const safeCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {}
}

const InfoRow = ({
  label,
  value,
  copyValue,
}: {
  label: string
  value: string
  copyValue?: string
}) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="min-w-0 flex items-center gap-2">
        <div className="min-w-0 truncate font-mono text-sm">{value}</div>
        {copyValue && (
          <Button
            variant="basic"
            className="h-8 min-w-0 px-3 text-xs"
            onClick={() => safeCopy(copyValue)}
          >
            复制
          </Button>
        )}
      </div>
    </div>
  )
}

function RouteComponent() {
  const [envs, setEnvs] = useState<EnvInfos | null>(null)
  const [envsError, setEnvsError] = useState<string | null>(null)

  const clashInfo = useClashInfo()
  const clashVersion = useClashVersion()

  useEffect(() => {
    collectEnvs()
      .then((data) => setEnvs(data))
      .catch((e) => setEnvsError(String(e)))
  }, [])

  const buildInfoEntries = useMemo(() => {
    if (!envs?.build_info) return []
    return Object.entries(envs.build_info).sort(([a], [b]) => a.localeCompare(b))
  }, [envs?.build_info])

  const coreEntries = useMemo(() => {
    if (!envs?.core) return []
    return Object.entries(envs.core).sort(([a], [b]) => a.localeCompare(b))
  }, [envs?.core])

  const appVersion = (packageJson as { version?: string }).version ?? '--'
  const appName = (packageJson as { name?: string }).name ?? 'clash-xiaoy'

  const serverText = clashInfo.data?.server
    ? `${clashInfo.data.server} (port: ${clashInfo.data.port})`
    : '--'

  const secretText = (() => {
    const secret = clashInfo.data?.secret
    if (!secret) return '--'
    const tail = secret.length > 6 ? secret.slice(-6) : secret
    return `******${tail}`
  })()

  const clashVersionText = clashVersion.data?.version ?? '--'
  const clashVariantText = clashVersion.data
    ? [
        clashVersion.data.meta ? 'meta' : null,
        clashVersion.data.premium ? 'premium' : null,
      ]
        .filter(Boolean)
        .join(' / ') || 'standard'
    : '--'

  return (
    <>
      <SettingsTitlePlaceholder />
      <SettingsTitle>About</SettingsTitle>

      <div className="flex flex-col gap-5 px-3 pb-8 sm:px-5">
        <Card className="bg-surface/70 border-outline/40 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-1">
              <div className="text-xl font-semibold tracking-tight">
                {appName}
              </div>
              <div className="text-sm text-zinc-500 leading-relaxed">
                Experimental Settings · About
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="flat" onClick={() => safeOpen('https://github.com/clash-xiaoy/clash-xiaoy')}>
                GitHub
              </Button>
              <Button variant="basic" onClick={() => safeOpen('https://github.com/clash-xiaoy/clash-xiaoy/releases')}>
                Releases
              </Button>
              <Button variant="basic" onClick={() => safeOpen('https://github.com/clash-xiaoy/clash-xiaoy/issues')}>
                Issues
              </Button>
              <Button variant="basic" onClick={() => safeOpen('https://nyanpasu.elaina.moe/')}>
                Docs
              </Button>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-outline/30 bg-surface/50 p-4">
              <InfoRow label="App Version" value={appVersion} copyValue={appVersion} />
              <InfoRow label="Platform" value={String(OS_PLATFORM)} copyValue={String(OS_PLATFORM)} />
              <InfoRow label="Nightly" value={String((window as any).__IS_NIGHTLY__ ?? false)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface/60 border-outline/30 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="text-base font-semibold">Clash Core</div>

            {clashInfo.isError || clashVersion.isError ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                {clashInfo.isError && <div>Clash Info: {String(clashInfo.error)}</div>}
                {clashVersion.isError && (
                  <div>Clash Version: {String(clashVersion.error)}</div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3 rounded-xl border border-outline/30 bg-surface/50 p-4">
                <InfoRow label="Server" value={serverText} copyValue={serverText === '--' ? undefined : serverText} />
                <InfoRow label="Secret" value={secretText} />
                <InfoRow label="Version" value={clashVersionText} copyValue={clashVersionText === '--' ? undefined : clashVersionText} />
                <InfoRow label="Variant" value={clashVariantText} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-surface/60 border-outline/30 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="text-base font-semibold">System</div>

            {envsError ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                {envsError}
              </div>
            ) : envs ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-outline/30 bg-surface/50 p-4">
                  <div className="text-sm font-medium">Device</div>
                  <div className="mt-3 flex flex-col gap-2">
                    <InfoRow label="OS" value={envs.os} copyValue={envs.os} />
                    <InfoRow label="Arch" value={envs.arch} copyValue={envs.arch} />
                    <InfoRow label="Kernel" value={envs.device.kernel || '--'} />
                    <InfoRow label="CPU" value={envs.device.cpu?.[0] || '--'} />
                    <InfoRow label="GPU" value={envs.device.gpu?.[0] || '--'} />
                    <InfoRow label="Memory" value={envs.device.memory || '--'} />
                    <InfoRow label="Uptime" value={envs.device.uptime ? `${envs.device.uptime}s` : '--'} />
                  </div>
                </div>

                <div className="rounded-xl border border-outline/30 bg-surface/50 p-4">
                  <div className="text-sm font-medium">Core</div>
                  <div className="mt-3 flex flex-col gap-2">
                    {coreEntries.length === 0 ? (
                      <div className="text-sm text-zinc-500">--</div>
                    ) : (
                      coreEntries.map(([k, v]) => (
                        <InfoRow key={k} label={k} value={v} copyValue={v} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-outline/30 bg-surface/50 px-4 py-10 text-center text-sm text-zinc-500">
                加载中...
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-surface/60 border-outline/30 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold">Build Info</div>
              <Button
                variant="basic"
                onClick={() => envs && safeCopy(JSON.stringify(envs.build_info ?? {}, null, 2))}
                disabled={!envs}
              >
                复制全部
              </Button>
            </div>

            {envs ? (
              <div
                className={cn(
                  'rounded-xl border border-outline/30 bg-surface/50 p-4',
                  'flex flex-col gap-2',
                )}
              >
                {buildInfoEntries.length === 0 ? (
                  <div className="text-sm text-zinc-500">--</div>
                ) : (
                  buildInfoEntries.map(([k, v]) => (
                    <InfoRow key={k} label={k} value={v} copyValue={v} />
                  ))
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-outline/30 bg-surface/50 px-4 py-10 text-center text-sm text-zinc-500">
                加载中...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
