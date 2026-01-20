# 发布到 GitHub（避免单文件 > 25MB）

本项目目录里可能存在本地构建产物（例如 `backend/target/`、`node_modules/`、安装包/压缩包等）。发布源码到 GitHub 时，建议只提交源码与必要配置文件，避免把大文件一起上传导致失败或超限。

## 1) 初始化并提交（推荐用 git push，不用网页拖拽）

在项目根目录（包含 `README.md` 的目录）执行：

```bash
git init
git add .
git commit -m "init"
```

## 2) 关联远端并推送

先在 GitHub 创建一个空仓库，然后在本地执行：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

## 3) 检查是否有单文件超过 25MB

如果你走 GitHub 网页上传，单文件常见限制是 25MB；如果走 `git push`，GitHub 对单文件更高（但仍不建议把大二进制放进源码仓库）。

你可以在仓库根目录执行（PowerShell）：

```powershell
Get-ChildItem -Recurse -File -Force |
  Sort-Object Length -Descending |
  Select-Object -First 20 @{n='MB';e={[math]::Round($_.Length/1MB,2)}}, FullName
```

## 4) 需要保留大文件时（可选）

如果确实要把大文件（模型、数据、安装包等）跟仓库一起分发：

- 优先：把大文件放到 GitHub Releases / 外部下载链接
- 其次：使用 Git LFS（适合必须放在仓库历史里的大二进制）

示例：

```bash
git lfs install
git lfs track "*.zip"
git add .gitattributes
git add path/to/your-large-file.zip
git commit -m "track large files with git lfs"
git push
```

