# 页面设计文档（类 iOS 风格，Desktop-first）

## 0. Global Styles（全局规范）

### 0.1 Layout

- 桌面优先：内容区最大宽度建议 1200–1440；大屏用 12 栅格，关键数据卡片以 3/4 列自适应。
- 主要布局：左侧 Sidebar + 顶部 Top Bar + 内容区（卡片网格/表格/编辑器）。
- 响应式：sm 及以下切换为 Drawer；保持现有断点逻辑不变，仅更新样式。

### 0.2 Meta Information（通用）

- Title：保持现有页面 title 逻辑（如 Dashboard/Settings 等）。
- Description/OG：桌面应用为主，Web 预览模式可保持简洁默认值，不新增营销文案。

### 0.3 Design Tokens（建议以 CSS Variables + MUI theme 同步）

- 颜色：
  - `--bg`: #0B0B0F（dark） / #F5F5F7（light）
  - `--surface`: rgba(255,255,255,0.06)（dark）/ #FFFFFF（light）
  - `--surface-2`: rgba(255,255,255,0.10)（dark）/ #F2F2F7（light）
  - `--text`: rgba(255,255,255,0.92)（dark）/ rgba(0,0,0,0.88)（light）
  - `--muted`: rgba(255,255,255,0.62) / rgba(0,0,0,0.56)
  - `--accent`: 使用现有主题色配置（不改变业务逻辑）
- 圆角：`--radius-card: 16px`，`--radius-control: 12px`，`--radius-pill: 999px`
- 阴影：更柔和、更低对比度；悬浮时轻微抬升（2–6px 模拟 iOS 层级）。
- 模糊：可选 `backdrop-filter: blur(16px)`；仅在性能允许的容器使用（优先 Top Bar/Modal）。
- 字体：保持现有字体加载；英文可优先 `system-ui`，数字信息使用更清晰的等宽/半等宽（不强制替换）。
- 动效：
  - 卡片 hover：`transform: translateY(-1px)` + shadow 加深
  - 按钮 active：轻微缩放 `scale(0.98)`
  - 过渡：`150–220ms ease-out`

### 0.4 通用组件（优先覆盖）

- Button：主按钮（accent 实心）、次按钮（surface 描边）、危险按钮（red）；支持 icon-only 与 segmented group。
- Card：统一 padding（12/16/20）、标题区/操作区规范；支持 “玻璃态/实体态”。
- Modal/Dialog：圆角更大、顶部标题+右侧关闭；底部操作区固定。
- Input/Select：高度统一（36/40），focus ring 使用 accent 柔光；错误态使用 red。
- Switch：iOS 风格轨道与圆点；保持现有状态/禁用逻辑不变。
- Tooltip/Dropdown：圆角 12、阴影更软；分隔线使用低对比度。
- Table/List：行高更舒适（40–48），分隔线更淡；选中态与 hover 态明确。

---

## 1. 仪表盘（Dashboard）

### 1.1 Page Structure

- 顶部：Top Bar（标题 + 可能的窗口控制/快捷入口，保持现有组件结构）。
- 主体：卡片网格（现有 Grid/DnD 逻辑不改）。

### 1.2 Sections & Components

1. 面板卡片容器（通用 Card）

- 标题区：左侧标题+副标题（可选），右侧轻量操作（如刷新/更多）。
- 内容区：保持现有面板内容组件（流量、连接、内存、系统、节点状态等）。

2. 拖拽反馈（DragOverlay）

- 拖拽中卡片：增加“抬升+放大 1.03–1.06”与更强阴影；光标/手势明确。
- 占位：保持网格占位规则不变，仅优化占位背景与虚线边框。

3. 信息层级

- 大数字（流量/速率）：字号更大、字重更高；单位更弱化。
- 状态类信息：使用 Badge/Chip（圆角 pill）区分成功/警告/错误。

---

## 2. 代理（Proxies）

### 2.1 Page Structure

- 左侧：代理组列表/分组导航（可用 Sidebar/列表）。
- 右侧：节点卡片/列表 + 操作条（延迟测试/排序）。

### 2.2 Sections & Components

- 代理组项：选中态使用 accent 轻底色 + 左侧指示条（不改变交互）。
- 节点卡片：统一卡片圆角与信息密度；延迟/特性标签以 chip 展示。
- 操作条：排序/筛选控件使用 segmented 风格（视觉），行为保持不变。

---

## 3. 配置（Profiles）

### 3.1 Page Structure

- 左侧：配置列表/来源（本地/远程）
- 右侧：配置详情、差异对比、编辑器（Monaco）

### 3.2 Sections & Components

- 列表项：标题+来源+更新时间；危险操作（删除）与主要操作（应用）分离。
- 编辑器容器：外层 Card；顶部工具条与编辑区分隔清晰；滚动条更细更淡。
- Dialog：导入/脚本/差异对比弹窗统一 iOS 风格。

---

## 4. 连接（Connections）

### 4.1 Page Structure

- 顶部：搜索/过滤工具条
- 主体：连接表格
- 侧向/弹窗：连接详情

### 4.2 Sections & Components

- 表格：行高 44–48；列标题弱化；hover/选中态清晰。
- 详情弹窗：信息分组为多个小 Card，减少长文本压迫感。

---

## 5. 日志（Logs）

### 5.1 Page Structure

- 顶部：级别筛选、关键字、清空
- 主体：日志列表（虚拟滚动如已存在则保持）

### 5.2 Sections & Components

- 日志行：等级 badge（颜色+文案），时间/来源弱化；等宽字体但对比度适中。
- 过滤条：控件紧凑但可读；清空为危险按钮样式。

---

## 6. 规则（Rules）

- 列表卡片化：规则条目使用轻分隔与更舒适行高；空态/错误态使用统一 Empty/Notice 组件风格。

---

## 7. 设置（Settings）

### 7.1 Page Structure

- 左侧：设置分组导航（或顶部 tabs，保持现有路由结构）
- 右侧：表单卡片分组（每组一个 Card）

### 7.2 Sections & Components

- 设置卡片：标题/说明/控件三段式；说明文本使用 muted。
- 开关项：左文案右 switch；高级选项折叠保持现有逻辑，仅美化折叠样式。
- 保存/重置：底部固定操作条（如现有则保持），按钮为主次分明。
