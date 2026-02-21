import path from 'node:path'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'
import packageJson from '../package.json'
import { colorize, consola } from './utils/logger'

const getFlagValue = (flag: string) => {
  const idx = process.argv.indexOf(flag)
  if (idx === -1) return undefined
  return process.argv.at(idx + 1)
}

const toPosixPath = (p: string) => p.replaceAll('\\', '/')

const isUnder = (relPosix: string, prefixPosix: string) =>
  relPosix === prefixPosix || relPosix.startsWith(`${prefixPosix}/`)

const shouldIncludePath = (relPosix: string) => {
  const rel = relPosix.replace(/^\.\//, '')

  const excludedPrefixes = [
    '.git',
    'node_modules',
    'dist',
    'backend/target',
    'backend/target-tauri',
    'backend/tauri/tmp',
    'manifest/site/updater',
  ]

  for (const prefix of excludedPrefixes) {
    if (isUnder(rel, prefix)) return false
  }

  const segments = rel.split('/').filter(Boolean)
  const excludedSegments = new Set([
    'node_modules',
    '.git',
    '.idea',
    '.turbo',
    '.verge',
    'target',
  ])
  if (segments.some((s) => excludedSegments.has(s))) return false

  if (segments.includes('dist') || segments.includes('dist-ssr')) return false

  const excludedFileNames = new Set([
    '.DS_Store',
    '.eslintcache',
    '.stylelintcache',
    'update.json',
  ])
  if (excludedFileNames.has(path.posix.basename(rel))) return false

  const ext = path.posix.extname(rel).toLowerCase()
  const excludedExts = new Set([
    '.zip',
    '.msi',
    '.pdb',
    '.d',
    '.rlib',
    '.rmeta',
    '.dll',
    '.lib',
    '.exp',
  ])

  if (excludedExts.has(ext)) return false

  if (ext === '.exe') {
    if (
      isUnder(rel, 'backend/tauri/sidecar') ||
      isUnder(rel, 'backend/tauri/resources')
    ) {
      return true
    }
    return false
  }

  return true
}

const listFilesRecursive = async (dir: string) => {
  const files: string[] = []

  const walk = async (current: string) => {
    const entries = await fs.readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const abs = path.join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(abs)
      } else if (entry.isFile()) {
        files.push(abs)
      }
    }
  }

  await walk(dir)
  return files
}

async function createSourceZip() {
  const rootDir = process.cwd()
  const outDir = path.resolve(getFlagValue('--out') ?? 'dist/source')
  await fs.ensureDir(outDir)

  const zipName = `clash-xiaoy_${packageJson.version}_source.zip`
  const outZipPath = path.join(outDir, zipName)
  if (await fs.pathExists(outZipPath)) {
    await fs.remove(outZipPath)
  }

  const zip = new AdmZip()
  const absFiles = await listFilesRecursive(rootDir)

  let added = 0
  for (const absFile of absFiles) {
    const rel = toPosixPath(path.relative(rootDir, absFile))
    if (!rel || rel.startsWith('../')) continue
    if (!shouldIncludePath(rel)) continue

    const zipDir = path.posix.dirname(rel)
    const zipBase = path.posix.basename(rel)
    zip.addLocalFile(absFile, zipDir === '.' ? '' : zipDir, zipBase)
    added += 1
  }

  zip.writeZip(outZipPath)
  const stat = await fs.stat(outZipPath)

  consola.success(
    colorize`source zip created: {green ${outZipPath}} (files: {green ${String(
      added,
    )}}, bytes: {green ${String(stat.size)}})`,
  )
}

createSourceZip().catch((err) => {
  consola.error(err)
  process.exit(1)
})
