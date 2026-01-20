// import { ArchMapping } from 'utils/manifest';
import { fetch, type RequestInit } from 'undici'
import {
  CLASH_META_ALPHA_MANIFEST,
  CLASH_META_MANIFEST,
} from '../manifest/clash-meta'
import { CLASH_MANIFEST } from '../manifest/clash-premium'
import {
  CLASH_RS_ALPHA_MANIFEST,
  CLASH_RS_MANIFEST,
} from '../manifest/clash-rs'
import { BinInfo, SupportedArch } from '../types'
import { getGithubUrl, getProxyAgent } from './'
import { SIDECAR_HOST } from './consts'
import { GITHUB_TOKEN } from './env'
import { consola } from './logger'
const SERVICE_REPO = 'libnyanpasu/nyanpasu-service'

type NodeArch = NodeJS.Architecture | 'armel'

function mappingArch(platform: NodeJS.Platform, arch: NodeArch): SupportedArch {
  const label = `${platform}-${arch}`
  switch (label) {
    case 'darwin-x64':
      return SupportedArch.DarwinX64
    case 'darwin-arm64':
      return SupportedArch.DarwinArm64
    case 'win32-x64':
      return SupportedArch.WindowsX86_64
    case 'win32-ia32':
      return SupportedArch.WindowsX86_32
    case 'win32-arm64':
      return SupportedArch.WindowsArm64
    case 'linux-x64':
      return SupportedArch.LinuxAmd64
    case 'linux-ia32':
      return SupportedArch.LinuxI386
    case 'linux-arm':
      return SupportedArch.LinuxArmv7hf
    case 'linux-arm64':
      return SupportedArch.LinuxAarch64
    case 'linux-armel':
      return SupportedArch.LinuxArmv7
    default:
      throw new Error('Unsupported platform/architecture: ' + label)
  }
}

export const getClashInfo = ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: NodeJS.Platform
  arch: NodeArch
  sidecarHost?: string
}): BinInfo => {
  const { ARCH_MAPPING, URL_PREFIX, LATEST_DATE } = CLASH_MANIFEST
  const archLabel = mappingArch(platform, arch)
  const name = ARCH_MAPPING[archLabel].replace('{}', LATEST_DATE as string)

  const isWin = platform === 'win32'

  const downloadURL = `${URL_PREFIX}${name}`

  const exeFile = `${name}${isWin ? '.exe' : ''}`

  const tmpFile = `${name}`

  const targetFile = `clash-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'clash',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getClashBackupInfo = ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: NodeJS.Platform
  arch: NodeArch
  sidecarHost?: string
}): BinInfo => {
  const { ARCH_MAPPING, BACKUP_URL_PREFIX, BACKUP_LATEST_DATE } = CLASH_MANIFEST

  const archLabel = mappingArch(platform, arch)
  const name = ARCH_MAPPING[archLabel].replace(
    '{}',
    BACKUP_LATEST_DATE as string,
  )
  const isWin = platform === 'win32'

  const downloadURL = `${BACKUP_URL_PREFIX}${BACKUP_LATEST_DATE}/${name}`

  const exeFile = `${name}${isWin ? '.exe' : ''}`

  const tmpFile = `${name}`

  const targetFile = `clash-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'clash',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getClashMetaInfo = ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: NodeJS.Platform
  arch: NodeArch
  sidecarHost?: string
}): BinInfo => {
  const { ARCH_MAPPING, URL_PREFIX, VERSION } = CLASH_META_MANIFEST
  const archLabel = mappingArch(platform, arch)

  const name = ARCH_MAPPING[archLabel].replace('{}', VERSION as string)

  const isWin = platform === 'win32'

  const downloadURL = `${URL_PREFIX}/${name}`

  const exeFile = `${name}${isWin ? '.exe' : ''}`

  const tmpFile = `${name}`

  const targetFile = `mihomo-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'mihomo',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getClashMetaAlphaInfo = async ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: NodeJS.Platform
  arch: NodeArch
  sidecarHost?: string
}): Promise<BinInfo> => {
  const { ARCH_MAPPING, URL_PREFIX } = CLASH_META_ALPHA_MANIFEST
  const version = await getMetaAlphaLatestVersion()
  const archLabel = mappingArch(platform as NodeJS.Platform, arch as NodeArch)
  const name = ARCH_MAPPING[archLabel].replace('{}', version)
  const isWin = platform === 'win32'
  const downloadURL = `${URL_PREFIX}/${name}`

  const exeFile = `${name}${isWin ? '.exe' : ''}`

  const tmpFile = `${name}`

  const targetFile = `mihomo-alpha-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'mihomo-alpha',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getClashRustInfo = ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: string
  arch: string
  sidecarHost?: string
}): BinInfo => {
  const { ARCH_MAPPING, URL_PREFIX, VERSION } = CLASH_RS_MANIFEST

  const archLabel = mappingArch(platform as NodeJS.Platform, arch as NodeArch)
  const name = ARCH_MAPPING[archLabel].replace('{}', VERSION as string)

  const isWin = platform === 'win32'

  const exeFile = `${name}`

  const downloadURL = `${URL_PREFIX}${VERSION}/${name}`

  const tmpFile = `${name}`

  const targetFile = `clash-rs-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'clash-rs',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getClashRsAlphaLatestVersion = async () => {
  const { VERSION_URL } = CLASH_RS_ALPHA_MANIFEST

  try {
    const opts = {} as Partial<RequestInit>

    const httpProxy = getProxyAgent()

    if (httpProxy) {
      opts.dispatcher = httpProxy
    }

    const urls = [VERSION_URL!, getGithubUrl(VERSION_URL!)]

    let response: Awaited<ReturnType<typeof fetch>> | undefined
    let lastError: unknown
    for (const u of urls) {
      try {
        response = await fetch(u, {
          method: 'GET',
          signal: AbortSignal.timeout(15_000),
          ...opts,
        })
        if (!response.ok) {
          throw new Error(
            `fetch latest release version failed: ${response.status} ${response.statusText} (${u})`,
          )
        }
        lastError = undefined
        break
      } catch (error) {
        lastError = error
      }
    }
    if (!response) throw lastError

    const v = (await response.text()).trim().split(' ').pop()!

    consola.info(`Clash Rs Alpha latest release version: ${v}`)

    return v.trim()
  } catch (error) {
    consola.warn('Error fetching latest release version:', error)
    throw error
  }
}

export const getClashRustAlphaInfo = async ({
  platform,
  arch,
  sidecarHost,
}: {
  platform: string
  arch: string
  sidecarHost?: string
}): Promise<BinInfo> => {
  const { ARCH_MAPPING, URL_PREFIX } = CLASH_RS_ALPHA_MANIFEST
  const version = await getClashRsAlphaLatestVersion()
  const archLabel = mappingArch(platform as NodeJS.Platform, arch as NodeArch)
  const name = ARCH_MAPPING[archLabel].replace('{}', version as string)

  const isWin = platform === 'win32'

  const exeFile = `${name}`

  const downloadURL = `${URL_PREFIX}/${name}`

  const tmpFile = `${name}`

  const targetFile = `clash-rs-alpha-${sidecarHost}${isWin ? '.exe' : ''}`

  return {
    name: 'clash-rs-alpha',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}

export const getMetaAlphaLatestVersion = async () => {
  const { VERSION_URL } = CLASH_META_ALPHA_MANIFEST

  try {
    const opts = {} as Partial<RequestInit>

    const httpProxy = getProxyAgent()

    if (httpProxy) {
      opts.dispatcher = httpProxy
    }

    const urls = [VERSION_URL!, getGithubUrl(VERSION_URL!)]

    let response: Awaited<ReturnType<typeof fetch>> | undefined
    let lastError: unknown
    for (const u of urls) {
      try {
        response = await fetch(u, {
          method: 'GET',
          signal: AbortSignal.timeout(15_000),
          ...opts,
        })
        if (!response.ok) {
          throw new Error(
            `fetch latest release version failed: ${response.status} ${response.statusText} (${u})`,
          )
        }
        lastError = undefined
        break
      } catch (error) {
        lastError = error
      }
    }
    if (!response) throw lastError

    const v = await response.text()

    consola.info(`Mihomo Alpha latest release version: ${v}`)

    return v.trim()
  } catch (error) {
    consola.warn('Error fetching latest release version:', error)
    throw error
  }
}

export const getNyanpasuServiceLatestVersion = async () => {
  try {
    const opts = {} as Partial<RequestInit>

    const httpProxy = getProxyAgent()
    if (httpProxy) {
      opts.dispatcher = httpProxy
    }

    const apiUrl = `https://api.github.com/repos/${SERVICE_REPO}/releases/latest`
    const urls = [apiUrl, getGithubUrl(apiUrl)]

    let lastError: unknown
    for (const u of urls) {
      try {
        const response = await fetch(u, {
          method: 'GET',
          signal: AbortSignal.timeout(15_000),
          ...opts,
          headers: {
            Accept: 'application/vnd.github+json',
            ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
          },
        })

        if (!response.ok) {
          throw new Error(
            `fetch latest release failed: ${response.status} ${response.statusText} (${u})`,
          )
        }

        const json = (await response.json()) as { tag_name?: string }
        const tag = json.tag_name
        if (!tag) throw new Error('Cannot find tag_name from GitHub API')

        consola.info(`Nyanpasu Service latest release version: ${tag}`)
        return tag.trim()
      } catch (error) {
        lastError = error
      }
    }

    throw lastError
  } catch (error) {
    consola.warn('Error fetching latest release version:', error)
    throw error
  }
}

export const getNyanpasuServiceInfo = async ({
  sidecarHost,
}: {
  sidecarHost: string
}): Promise<BinInfo> => {
  const name = `nyanpasu-service`
  const isWin = SIDECAR_HOST?.includes('windows')
  const urlExt = isWin ? 'zip' : 'tar.gz'
  // first we had to get the latest tag
  const version = await getNyanpasuServiceLatestVersion()
  const downloadURL = `https://github.com/${SERVICE_REPO}/releases/download/${version}/${name}-${sidecarHost}.${urlExt}`
  const exeFile = `${name}${isWin ? '.exe' : ''}`
  const tmpFile = `${name}-${sidecarHost}.${urlExt}`
  const targetFile = `nyanpasu-service-${sidecarHost}${isWin ? '.exe' : ''}`
  return {
    name: 'nyanpasu-service',
    targetFile,
    exeFile,
    tmpFile,
    downloadURL,
  }
}
