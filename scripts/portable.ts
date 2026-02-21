import path from 'node:path'
import AdmZip from 'adm-zip'
import fs from 'fs-extra'
import { context, getOctokit } from '@actions/github'
import packageJson from '../package.json'
import { TAURI_APP_DIR } from './utils/env'
import { colorize, consola } from './utils/logger'

const RUST_ARCH = process.env.RUST_ARCH || 'x86_64'
const fixedWebview = process.argv.includes('--fixed-webview')

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

/// Script for ci
/// 打包绿色版/便携版 (only Windows)
async function resolvePortable() {
  if (process.platform !== 'win32') return

  const preferredBuildDirs = [
    'backend/target-tauri/release',
    RUST_ARCH === 'x86_64'
      ? 'backend/target/release'
      : `backend/target/${getRustTargetTriple(RUST_ARCH)}/release`,
  ]

  const buildDir =
    preferredBuildDirs.find((dir) => fs.pathExistsSync(dir)) ??
    preferredBuildDirs[1]!

  const configDir = path.join(buildDir, '.config')

  if (!(await fs.pathExists(buildDir))) {
    throw new Error('could not found the release dir')
  }

  await fs.ensureDir(configDir)
  await fs.createFile(path.join(configDir, 'PORTABLE'))

  const zip = new AdmZip()

  const addFile = async (sourcePath: string, zipName?: string) => {
    if (!(await fs.pathExists(sourcePath))) return false
    zip.addLocalFile(sourcePath, '', zipName)
    return true
  }

  const mainEntryCandidates = [
    path.join(buildDir, 'clash-xiaoy.exe'),
    path.join(buildDir, 'Clash Xiaoy.exe'),
    path.join(buildDir, 'Clash Nyanpasu.exe'),
    path.join(buildDir, 'clash-nyanpasu.exe'),
  ]

  const mainEntryPath = (
    await Promise.all(
      mainEntryCandidates.map(async (p) =>
        (await fs.pathExists(p)) ? p : null,
      ),
    )
  ).find(Boolean)

  if (!mainEntryPath) {
    throw new Error('main app exe not found in release dir')
  }

  zip.addLocalFile(mainEntryPath)

  const triple = getRustTargetTriple(RUST_ARCH)
  const sidecarDir = path.join(TAURI_APP_DIR, 'sidecar')
  const sidecarMap: Array<{ zipName: string; candidates: string[] }> = [
    {
      zipName: 'clash.exe',
      candidates: [
        path.join(buildDir, 'clash.exe'),
        path.join(sidecarDir, `clash-${triple}.exe`),
      ],
    },
    {
      zipName: 'mihomo.exe',
      candidates: [
        path.join(buildDir, 'mihomo.exe'),
        path.join(sidecarDir, `mihomo-${triple}.exe`),
      ],
    },
    {
      zipName: 'mihomo-alpha.exe',
      candidates: [
        path.join(buildDir, 'mihomo-alpha.exe'),
        path.join(sidecarDir, `mihomo-alpha-${triple}.exe`),
      ],
    },
    {
      zipName: 'nyanpasu-service.exe',
      candidates: [
        path.join(buildDir, 'nyanpasu-service.exe'),
        path.join(sidecarDir, `nyanpasu-service-${triple}.exe`),
      ],
    },
    {
      zipName: 'clash-rs.exe',
      candidates: [
        path.join(buildDir, 'clash-rs.exe'),
        path.join(sidecarDir, `clash-rs-${triple}.exe`),
      ],
    },
    {
      zipName: 'clash-rs-alpha.exe',
      candidates: [
        path.join(buildDir, 'clash-rs-alpha.exe'),
        path.join(sidecarDir, `clash-rs-alpha-${triple}.exe`),
      ],
    },
  ]

  for (const { zipName, candidates } of sidecarMap) {
    const source = (
      await Promise.all(
        candidates.map(async (p) => ((await fs.pathExists(p)) ? p : null)),
      )
    ).find(Boolean)

    if (!source) {
      consola.warn(colorize`portable missing {yellow ${zipName}}`)
      continue
    }
    await addFile(source, zipName)
  }

  if (await fs.pathExists(path.join(buildDir, 'resources'))) {
    zip.addLocalFolder(path.join(buildDir, 'resources'), 'resources')
  } else if (await fs.pathExists(path.join(TAURI_APP_DIR, 'resources'))) {
    zip.addLocalFolder(path.join(TAURI_APP_DIR, 'resources'), 'resources')
  }

  if (fixedWebview) {
    const webviewPath = (await fs.readdir(TAURI_APP_DIR)).find((file) =>
      file.includes('WebView2'),
    )
    if (!webviewPath) {
      throw new Error('WebView2 runtime not found')
    }
    zip.addLocalFolder(
      path.join(TAURI_APP_DIR, webviewPath),
      path.basename(webviewPath),
    )
  }

  zip.addLocalFolder(configDir, '.config')

  const { version } = packageJson

  const zipFile = `clash-xiaoy_${version}_${RUST_ARCH}${fixedWebview ? '_fixed-webview' : ''}_portable.zip`
  zip.writeZip(zipFile)

  consola.success('create portable zip successfully')

  // push release assets
  if (process.env.GITHUB_TOKEN === undefined) {
    consola.info('GITHUB_TOKEN not found, skip uploading release asset')
    return
  }

  const options = { owner: context.repo.owner, repo: context.repo.repo }
  const github = getOctokit(process.env.GITHUB_TOKEN)

  consola.info('upload to ', process.env.TAG_NAME || `v${version}`)

  const { data: release } = await github.rest.repos.getReleaseByTag({
    ...options,
    tag: process.env.TAG_NAME || `v${version}`,
  })

  consola.debug(colorize`releaseName: {green ${release.name}}`)

  await github.rest.repos.uploadReleaseAsset({
    ...options,
    release_id: release.id,
    name: zipFile,
    // @ts-expect-error data is Buffer should work fine
    data: zip.toBuffer(),
  })
}

resolvePortable().catch((err) => {
  consola.error(err)
  process.exit(1)
})
