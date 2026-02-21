import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'fs-extra'
import packageJson from '../package.json'
import { colorize, consola } from './utils/logger'

const isFlagEnabled = (flag: string) => process.argv.includes(flag)
const getFlagValue = (flag: string) => {
  const idx = process.argv.indexOf(flag)
  if (idx === -1) return undefined
  return process.argv.at(idx + 1)
}

const run = (command: string) => {
  consola.info(colorize`run: {green ${command}}`)
  execSync(command, {
    stdio: 'inherit',
    env: process.env,
  })
}

const findBestFile = async (
  dir: string,
  predicate: (file: string) => boolean,
  preferred: (file: string) => boolean,
) => {
  if (!(await fs.pathExists(dir))) return undefined
  const entries = await fs.readdir(dir, { recursive: true })
  const matched = entries
    .map((p) => p.toString())
    .filter((p) => predicate(p))
    .sort()

  const preferredMatch = matched.find((p) => preferred(p))
  if (preferredMatch) return path.join(dir, preferredMatch)
  return matched.length > 0 ? path.join(dir, matched[0]!) : undefined
}

const syncTauriVersion = async (version: string) => {
  const tauriConfPath = path.resolve('backend/tauri/tauri.conf.json')
  if (!(await fs.pathExists(tauriConfPath))) return

  const tauriConf = await fs.readJSON(tauriConfPath)
  if (tauriConf?.version === version) return

  tauriConf.version = version
  await fs.writeJSON(tauriConfPath, tauriConf, { spaces: 2 })
  consola.success(colorize`sync tauri version -> {green ${version}}`)
}

const getRustTargetTriple = (arch: string) => {
  switch (arch) {
    case 'x86_64':
      return 'x86_64-pc-windows-msvc'
    case 'i686':
      return 'i686-pc-windows-msvc'
    case 'aarch64':
      return 'aarch64-pc-windows-msvc'
    default:
      return `${arch}-pc-windows-msvc`
  }
}

async function packageWindows() {
  if (process.platform !== 'win32') {
    consola.warn('This script is only for Windows.')
    return
  }

  const fixedWebview = isFlagEnabled('--fixed-webview')
  const skipBuild = isFlagEnabled('--skip-build')
  const outputDir = path.resolve(getFlagValue('--out') ?? 'dist/windows')

  await fs.ensureDir(outputDir)

  const version = packageJson.version

  // If RUST_ARCH is set, build only that. Otherwise build all supported architectures.
  const archs = process.env.RUST_ARCH
    ? [process.env.RUST_ARCH]
    : ['x86_64', 'i686', 'aarch64']

  for (const arch of archs) {
    consola.info(colorize`Packaging for architecture: {cyan ${arch}}`)

    process.env.RUST_ARCH = arch
    const targetTriple = getRustTargetTriple(arch)

    // Check if sidecars exist for this architecture
    const sidecarCheckPath = path.resolve(
      `backend/tauri/sidecar/clash-${targetTriple}.exe`,
    )
    if (!(await fs.pathExists(sidecarCheckPath))) {
      consola.warn(
        colorize`Sidecar binary not found: {yellow ${sidecarCheckPath}}`,
      )
      consola.warn(
        colorize`Skipping architecture {cyan ${arch}} due to missing sidecars.`,
      )
      continue
    }

    const portableZipName = `clash-xiaoy_${version}_${arch}${fixedWebview ? '_fixed-webview' : ''}_portable.zip`
    const portableZipPath = path.resolve(portableZipName)

    if (!skipBuild) {
      await syncTauriVersion(version)
      try {
        run(`pnpm build -- --target ${targetTriple}`)
      } catch (e) {
        consola.error(
          colorize`Build failed for {cyan ${arch}}. Skipping packaging for this arch.`,
        )
        continue
      }
    }

    if (await fs.pathExists(portableZipPath)) {
      await fs.remove(portableZipPath)
    }

    try {
      run(`pnpm portable${fixedWebview ? ' --fixed-webview' : ''}`)
    } catch (e) {
      consola.error(colorize`Portable packaging failed for {cyan ${arch}}.`)
      continue
    }

    const strictTargetDir = path.resolve(`backend/target/${targetTriple}`)
    const searchDirs = [strictTargetDir]
    if (arch === 'x86_64') {
      searchDirs.push(path.resolve('backend/target'))
    }

    let nsisInstallerPath: string | undefined

    for (const dir of searchDirs) {
      nsisInstallerPath = await findBestFile(
        dir,
        (p) => {
          const normalized = p.replaceAll('\\', '/')
          return (
            normalized.includes('/bundle/nsis/') &&
            normalized.endsWith('.exe') &&
            normalized.toLowerCase().includes('setup')
          )
        },
        (p) => p.includes(`_${version}_`),
      )
      if (nsisInstallerPath) break
    }

    const copiedFiles: string[] = []

    if (nsisInstallerPath) {
      const targetName = path.basename(nsisInstallerPath)
      const target = path.join(outputDir, targetName)
      await fs.copyFile(nsisInstallerPath, target)
      copiedFiles.push(target)
    } else {
      consola.warn(
        `NSIS installer exe not found for ${arch} in ${searchDirs.join(', ')}.`,
      )
    }

    if (await fs.pathExists(portableZipPath)) {
      const target = path.join(outputDir, path.basename(portableZipPath))
      await fs.move(portableZipPath, target, { overwrite: true })
      copiedFiles.push(target)
    } else {
      consola.error(`portable zip not found: ${portableZipPath}`)
    }

    consola.success(`Windows packages generated for ${arch}:`)
    for (const file of copiedFiles) {
      consola.success(colorize`- {green ${file}}`)
    }
  }
}

packageWindows().catch((err) => {
  consola.error(err)
  process.exit(1)
})
