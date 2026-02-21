import { execSync } from 'node:child_process'
import fs from 'fs-extra'
import { GIT_SUMMARY_INFO_PATH, TAURI_APP_TEMP_DIR } from './utils/env'
import { consola } from './utils/logger'

async function main() {
  let hash = 'unknown'
  let author = 'clash-xiaoy'
  let time = new Date().toISOString()

  try {
    const output = execSync(
      "git show --pretty=format:'%H,%cn,%cI' --no-patch --no-notes",
      {
        cwd: process.cwd(),
        stdio: 'pipe', // Suppress stderr
      },
    ).toString()

    if (output) {
      const parts = output.replace(/'/g, '').split(',')
      if (parts.length >= 3) {
        hash = parts[0]
        author = parts[1]
        time = parts[2]
      }
    }
  } catch (e) {
    consola.warn('Failed to get git info, using default values')
  }

  const summary = {
    hash,
    author,
    time,
  }
  consola.info(summary)
  if (!(await fs.exists(TAURI_APP_TEMP_DIR))) {
    await fs.mkdir(TAURI_APP_TEMP_DIR)
  }

  await fs.writeJSON(GIT_SUMMARY_INFO_PATH, summary, { spaces: 2 })
  consola.success('Git summary info generated')
}

main().catch(consola.error)
