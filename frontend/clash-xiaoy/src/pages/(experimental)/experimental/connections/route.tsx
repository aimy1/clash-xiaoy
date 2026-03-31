import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AppContentScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute(
  '/(experimental)/experimental/connections',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppContentScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-5 p-4 sm:p-6 lg:p-8">
        <Card className="bg-surface/70 border-outline/40">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">连接管理</h2>
              <p className="text-sm text-zinc-500">
                查看当前连接、按规则过滤，并支持快速关闭连接
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
              <Button variant="flat">刷新连接</Button>
              <Button variant="basic">关闭全部</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="flex min-h-20 items-end justify-between">
              <div className="space-y-1">
                <div className="text-xs text-zinc-500">活动连接</div>
                <div className="text-2xl font-semibold">0</div>
              </div>
              <div className="text-xs text-zinc-400">CONN</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="flex min-h-20 items-end justify-between">
              <div className="space-y-1">
                <div className="text-xs text-zinc-500">下载速度</div>
                <div className="text-base font-semibold">0 KB/s</div>
              </div>
              <div className="text-xs text-zinc-400">DOWN</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="flex min-h-20 items-end justify-between">
              <div className="space-y-1">
                <div className="text-xs text-zinc-500">上传速度</div>
                <div className="text-base font-semibold">0 KB/s</div>
              </div>
              <div className="text-xs text-zinc-400">UP</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/60 border-outline/30">
            <CardContent className="flex min-h-20 items-end justify-between">
              <div className="space-y-1">
                <div className="text-xs text-zinc-500">总流量</div>
                <div className="text-base font-semibold">0 MB</div>
              </div>
              <div className="text-xs text-zinc-400">TOTAL</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-surface/60 border-outline/30">
          <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm font-medium">连接筛选</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="stroked">全部</Button>
              <Button variant="flat">TCP</Button>
              <Button variant="flat">UDP</Button>
              <Button variant="flat">HTTP</Button>
              <Button variant="flat">规则命中</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface/50 border-outline/30">
          <CardContent className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-center">
            <div className="text-base font-medium">暂无活动连接</div>
            <p className="max-w-md text-sm text-zinc-500">
              当有应用流量经过代理时，这里会显示连接目标、规则与实时速率信息。
            </p>
            <Button variant="flat">重新获取</Button>
          </CardContent>
        </Card>
      </div>
    </AppContentScrollArea>
  )
}
