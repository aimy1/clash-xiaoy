import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { filesize } from 'filesize';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AppContentScrollArea } from '@/components/ui/scroll-area';
import { useClashProxiesProvider, useClashRulesProvider, } from '@nyanpasu/interface';
import { cn } from '@nyanpasu/ui';
export const Route = createFileRoute('/(experimental)/experimental/providers')({
    component: RouteComponent,
});
const formatDateTime = (value) => {
    if (!value)
        return '--';
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return String(value);
    return date.toLocaleString();
};
const formatExpire = (expire) => {
    if (!expire)
        return '--';
    const date = new Date(expire * 1000);
    if (Number.isNaN(date.getTime()))
        return '--';
    return date.toLocaleDateString();
};
const ProxyProviderCard = ({ provider, updating, onUpdate, }) => {
    const info = provider.subscriptionInfo;
    return (<div className="rounded-xl border border-outline/30 bg-surface/60 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold">{provider.name}</div>
          <div className="mt-1 text-xs text-zinc-500">
            {provider.vehicleType}/{provider.type}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-zinc-500">
            更新于 {formatDateTime(provider.updatedAt)}
          </div>
          <Button variant="flat" onClick={onUpdate} disabled={updating}>
            {updating ? '更新中' : '更新'}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
          {provider.proxies.length} proxies
        </span>
        {provider.testUrl && (<span className="truncate rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
            test: {provider.testUrl}
          </span>)}
      </div>

      {info && (<div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-500">
          <div className="rounded-lg border border-outline/30 bg-surface/50 px-3 py-2">
            <div className="text-[11px]">已用</div>
            <div className="mt-0.5 font-mono text-sm text-on-surface">
              {filesize(info.upload + info.download, { pad: true })}
            </div>
          </div>
          <div className="rounded-lg border border-outline/30 bg-surface/50 px-3 py-2">
            <div className="text-[11px]">总量</div>
            <div className="mt-0.5 font-mono text-sm text-on-surface">
              {filesize(info.total, { pad: true })}
            </div>
          </div>
          <div className="rounded-lg border border-outline/30 bg-surface/50 px-3 py-2">
            <div className="text-[11px]">上传</div>
            <div className="mt-0.5 font-mono text-sm text-on-surface">
              {filesize(info.upload, { pad: true })}
            </div>
          </div>
          <div className="rounded-lg border border-outline/30 bg-surface/50 px-3 py-2">
            <div className="text-[11px]">到期</div>
            <div className="mt-0.5 font-mono text-sm text-on-surface">
              {formatExpire(info.expire)}
            </div>
          </div>
        </div>)}
    </div>);
};
const RulesProviderCard = ({ provider, updating, onUpdate, }) => {
    return (<div className="rounded-xl border border-outline/30 bg-surface/60 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold">{provider.name}</div>
          <div className="mt-1 text-xs text-zinc-500">
            {provider.vehicleType}/{provider.behavior}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-zinc-500">
            更新于 {formatDateTime(provider.updatedAt)}
          </div>
          <Button variant="flat" onClick={onUpdate} disabled={updating}>
            {updating ? '更新中' : '更新'}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
          {provider.ruleCount} rules
        </span>
        <span className="rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
          {provider.format}
        </span>
        <span className="rounded-md bg-surface/70 px-2 py-0.5 text-xs text-zinc-600">
          {provider.type}
        </span>
      </div>
    </div>);
};
function RouteComponent() {
    const proxiesProvider = useClashProxiesProvider();
    const rulesProvider = useClashRulesProvider();
    const [filterText, setFilterText] = useState('');
    const [updating, setUpdating] = useState({});
    const [updatingAll, setUpdatingAll] = useState({ proxies: false, rules: false });
    const [actionError, setActionError] = useState(null);
    const proxiesItems = useMemo(() => {
        const entries = Object.entries(proxiesProvider.data ?? {});
        const query = filterText.trim().toLowerCase();
        const filtered = query
            ? entries.filter(([name, item]) => {
                const text = `${name} ${item.type} ${item.vehicleType}`.toLowerCase();
                return text.includes(query);
            })
            : entries;
        return filtered.sort(([a], [b]) => a.localeCompare(b));
    }, [filterText, proxiesProvider.data]);
    const rulesItems = useMemo(() => {
        const entries = Object.entries(rulesProvider.data ?? {});
        const query = filterText.trim().toLowerCase();
        const filtered = query
            ? entries.filter(([name, item]) => {
                const text = `${name} ${item.type} ${item.vehicleType} ${item.behavior}`.toLowerCase();
                return text.includes(query);
            })
            : entries;
        return filtered.sort(([a], [b]) => a.localeCompare(b));
    }, [filterText, rulesProvider.data]);
    const updateOne = async (key, fn) => {
        setActionError(null);
        setUpdating((prev) => ({ ...prev, [key]: true }));
        try {
            await fn();
        }
        catch (e) {
            setActionError(String(e));
        }
        finally {
            setUpdating((prev) => ({ ...prev, [key]: false }));
        }
    };
    const updateAll = async (kind, items) => {
        setActionError(null);
        setUpdatingAll((prev) => ({ ...prev, [kind]: true }));
        try {
            const results = await Promise.allSettled(items.map(([, p]) => p.mutate()));
            const rejected = results.find((r) => r.status === 'rejected');
            if (rejected && rejected.status === 'rejected') {
                setActionError(String(rejected.reason));
            }
        }
        finally {
            setUpdatingAll((prev) => ({ ...prev, [kind]: false }));
        }
    };
    const isAnyLoading = proxiesProvider.isLoading || rulesProvider.isLoading;
    const errorText = (() => {
        if (proxiesProvider.isError)
            return String(proxiesProvider.error);
        if (rulesProvider.isError)
            return String(rulesProvider.error);
        return null;
    })();
    return (<div className="flex h-full flex-col">
      <div className="border-outline/40 bg-surface/70 flex items-center gap-3 border-b px-4 py-3">
        <div className="flex flex-col">
          <div className="text-sm font-medium">Providers</div>
          <div className="text-xs text-zinc-500">
            {isAnyLoading
            ? '加载中...'
            : `代理 ${Object.keys(proxiesProvider.data ?? {}).length} · 规则 ${Object.keys(rulesProvider.data ?? {}).length}`}
            {filterText.trim()
            ? ` · 已筛选 代理 ${proxiesItems.length} · 规则 ${rulesItems.length}`
            : ''}
          </div>
        </div>

        <div className="flex-1"/>

        <div className="w-[280px] max-w-[50vw]">
          <Input variant="outlined" label="搜索 provider" value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
        </div>

        <Button variant="flat" onClick={() => Promise.all([proxiesProvider.refetch(), rulesProvider.refetch()])} disabled={proxiesProvider.isFetching || rulesProvider.isFetching}>
          {proxiesProvider.isFetching || rulesProvider.isFetching ? '刷新中' : '刷新'}
        </Button>
      </div>

      <AppContentScrollArea className="flex-1">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:p-8">
          <Card className="bg-surface/70 border-outline/40 shadow-sm">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="text-lg font-semibold tracking-tight">
                Providers 管理
              </div>
              <div className="text-sm text-zinc-500 leading-relaxed">
                这里展示 Clash 的代理提供者与规则提供者，可单个更新或一键更新全部。
              </div>
              {errorText && (<div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                  加载失败：{errorText}
                </div>)}
              {actionError && (<div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-700">
                  操作失败：{actionError}
                </div>)}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="text-base font-semibold">代理提供者</div>
              <div className="text-xs text-zinc-500">
                {isAnyLoading
            ? '加载中...'
            : `共 ${Object.keys(proxiesProvider.data ?? {}).length} 个`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="flat" onClick={() => updateAll('proxies', proxiesItems)} disabled={updatingAll.proxies || proxiesItems.length === 0}>
                {updatingAll.proxies ? '更新中' : '更新全部'}
              </Button>
            </div>
          </div>

          {proxiesItems.length === 0 && !proxiesProvider.isLoading ? (<div className="bg-surface/40 border-outline/40 rounded-xl border px-3 py-10 text-center">
              <div className="text-sm font-medium">暂无代理提供者</div>
              <div className="mt-1 text-xs text-zinc-500">
                请检查配置文件中的 proxy-providers 或订阅状态
              </div>
            </div>) : (<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {proxiesItems.map(([key, provider]) => (<ProxyProviderCard key={key} provider={provider} updating={Boolean(updating[`proxies:${key}`])} onUpdate={() => updateOne(`proxies:${key}`, provider.mutate)}/>))}
            </div>)}

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex flex-col">
              <div className="text-base font-semibold">规则提供者</div>
              <div className="text-xs text-zinc-500">
                {isAnyLoading
            ? '加载中...'
            : `共 ${Object.keys(rulesProvider.data ?? {}).length} 个`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="flat" onClick={() => updateAll('rules', rulesItems)} disabled={updatingAll.rules || rulesItems.length === 0}>
                {updatingAll.rules ? '更新中' : '更新全部'}
              </Button>
            </div>
          </div>

          {rulesItems.length === 0 && !rulesProvider.isLoading ? (<div className="bg-surface/40 border-outline/40 rounded-xl border px-3 py-10 text-center">
              <div className="text-sm font-medium">暂无规则提供者</div>
              <div className="mt-1 text-xs text-zinc-500">
                请检查配置文件中的 rule-providers 或订阅状态
              </div>
            </div>) : (<div className={cn('grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3')}>
              {rulesItems.map(([key, provider]) => (<RulesProviderCard key={key} provider={provider} updating={Boolean(updating[`rules:${key}`])} onUpdate={() => updateOne(`rules:${key}`, provider.mutate)}/>))}
            </div>)}
        </div>
      </AppContentScrollArea>
    </div>);
}
