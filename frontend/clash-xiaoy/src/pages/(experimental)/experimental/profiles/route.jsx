import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AppContentScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@nyanpasu/ui';
import { useProfile } from '@nyanpasu/interface';
import { useMemo, useState } from 'react';
export const Route = createFileRoute('/(experimental)/experimental/profiles')({
    component: RouteComponent,
});
function RouteComponent() {
    const { query, create, upsert, drop } = useProfile();
    const [subscribeUrl, setSubscribeUrl] = useState('');
    const items = query.data?.items ?? [];
    const current = query.data?.current ?? [];
    const activeUid = current[0];
    const stat = useMemo(() => {
        const latest = items.reduce((acc, item) => Math.max(acc, item.updated || 0), 0);
        const latestText = latest
            ? new Date(latest * 1000).toLocaleString()
            : '--';
        const activeName = items.find((item) => item.uid === activeUid)?.name || '未选择';
        return {
            total: items.length,
            activeName,
            latestText,
        };
    }, [activeUid, items]);
    const isUrlValid = /^https?:\/\/\S+$/i.test(subscribeUrl.trim());
    return (<AppContentScrollArea className="h-full">
      <div className="space-y-4 p-4 sm:p-6">
        <Card className="bg-surface/70 border-outline/40">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">配置文件</h2>
              <p className="text-sm text-zinc-500">
                在这里管理订阅、导入本地配置与快速切换配置文件
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="flat" onClick={() => create.mutate({
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
        })} disabled={create.isPending}>
                {create.isPending ? '创建中...' : '新建配置'}
              </Button>
              <Button variant="raised" onClick={() => query.refetch()}>
                刷新列表
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface/60 border-outline/30">
          <CardContent className="space-y-3">
            <div className="text-sm font-semibold">通过链接导入配置</div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Input variant="outlined" label="订阅链接" value={subscribeUrl} onChange={(event) => setSubscribeUrl(event.target.value)}/>
              </div>
              <Button variant="raised" disabled={!isUrlValid || create.isPending} onClick={() => create.mutate({
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
        }, {
            onSuccess: () => setSubscribeUrl(''),
        })}>
                {create.isPending ? '导入中...' : '导入并生成配置'}
              </Button>
            </div>
            {!isUrlValid && subscribeUrl.length > 0 && (<div className="text-xs text-zinc-500">
                请输入有效链接（以 http:// 或 https:// 开头）
              </div>)}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="space-y-2">
              <div className="text-xs text-zinc-500">总配置数</div>
              <div className="text-2xl font-semibold">{stat.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="space-y-2">
              <div className="text-xs text-zinc-500">当前使用</div>
              <div className="text-base font-semibold">{stat.activeName}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="space-y-2">
              <div className="text-xs text-zinc-500">最后更新</div>
              <div className="text-base font-semibold">{stat.latestText}</div>
            </CardContent>
          </Card>
        </div>

        {items.length === 0 ? (<Card className="bg-surface/50 border-outline/30">
            <CardContent className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-center">
              <div className="text-base font-medium">暂无配置文件</div>
              <p className="max-w-md text-sm text-zinc-500">
                你可以通过订阅链接或本地文件导入配置，导入后会在此处展示并支持切换。
              </p>
              <div className="flex gap-2">
                <Button variant="flat" onClick={() => query.refetch()}>
                  重新获取
                </Button>
              </div>
            </CardContent>
          </Card>) : (<Card className="bg-surface/50 border-outline/30">
            <CardContent className="space-y-2 p-3">
              {items.map((item) => {
                const active = activeUid === item.uid;
                return (<div key={item.uid} className={cn('border-outline/40 bg-surface/70 rounded-xl border p-3', active && 'bg-surface-variant/50 border-primary/30')}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-xs text-zinc-500">
                          {item.type.toUpperCase()} · {item.file}
                        </div>
                        <div className="text-xs text-zinc-500">
                          更新时间：{new Date(item.updated * 1000).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant={active ? 'stroked' : 'flat'} disabled={active || upsert.isPending} onClick={() => upsert.mutate({ current: [item.uid] })}>
                          {active ? '当前使用' : '设为当前'}
                        </Button>
                        <Button variant="basic" disabled={drop.isPending} onClick={() => drop.mutate(item.uid)}>
                          删除
                        </Button>
                      </div>
                    </div>
                  </div>);
            })}
            </CardContent>
          </Card>)}
      </div>
    </AppContentScrollArea>);
}
