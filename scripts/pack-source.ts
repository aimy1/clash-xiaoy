import path from 'node:path'
import { fileURLToPath } from 'node:url'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'
import { consola } from './utils/logger'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function packSource() {
  const rootDir = path.resolve(__dirname, '..')
  const zip = new AdmZip()
  
  consola.info('Scanning files...')

  // 定义要忽略的目录名称（完全匹配）
  const ignoreDirs = new Set([
    'node_modules',
    'target',
    '.git',
    'dist',
    '.cache',
    '.vscode',
    '.idea',
    'coverage',
    '.tools', // 包含工具链，可能很大，视情况排除
    '.tooling'
  ])

  // 定义要忽略的文件扩展名
  const ignoreExts = new Set([
    '.zip',
    '.exe',
    '.log',
    '.dll',
    '.lib',
    '.pdb',
    '.exp',
    '.node'
  ])

  let fileCount = 0

  async function traverse(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      const relativePath = path.relative(rootDir, fullPath)

      if (entry.isDirectory()) {
        if (ignoreDirs.has(entry.name)) {
          continue
        }
        // 特殊处理：如果是 release 目录，通常包含构建产物，也排除
        if (entry.name === 'release' && (relativePath.includes('target') || relativePath.includes('out'))) {
           continue
        }
        
        await traverse(fullPath)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (ignoreExts.has(ext)) {
          continue
        }
        // 排除自身生成的 zip
        if (entry.name === 'clash-xiaoy-source-code.zip') {
          continue
        }

        // 添加文件到 zip
        // adm-zip 的 addLocalFile 第二个参数是 zip 内的路径，如果不传则默认展平或保持结构？
        // addLocalFile(localPath, zipPath, zipName)
        // zipPath 是 zip 内的文件夹路径
        const zipFolderPath = path.dirname(relativePath)
        zip.addLocalFile(fullPath, zipFolderPath === '.' ? '' : zipFolderPath)
        fileCount++
      }
    }
  }

  await traverse(rootDir)

  consola.info(`Found ${fileCount} files to pack.`)

  const outputName = 'clash-xiaoy-source-code.zip'
  const outputPath = path.join(rootDir, outputName)
  
  consola.info(`Writing zip to ${outputPath}...`)
  zip.writeZip(outputPath)
  
  consola.success(`Source code packed successfully: ${outputName}`)
}

packSource().catch((err) => {
  consola.error(err)
  process.exit(1)
})
