const fs = require('fs')
const path = require('path')

const messagesDir = path.join(__dirname, 'messages')
const enPath = path.join(messagesDir, 'en.json')

if (!fs.existsSync(enPath)) {
  console.error('Error: en.json not found at', enPath)
  process.exit(1)
}

const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const keys = Object.keys(enContent)
const totalKeys = keys.length

const files = fs
  .readdirSync(messagesDir)
  .filter((f) => f.endsWith('.json') && f !== 'en.json')

const report = []

files.forEach((file) => {
  const filePath = path.join(messagesDir, file)
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    let identicalCount = 0

    keys.forEach((key) => {
      // Skip language name key
      if (key === 'language') return

      if (content[key] === enContent[key]) {
        identicalCount++
      }
    })

    const checkKeys = totalKeys - 1 // Exclude 'language'
    const ratio = identicalCount / checkKeys

    if (ratio > 0.5) {
      report.push({
        file: file,
        identical: identicalCount,
        total: checkKeys,
        ratio: (ratio * 100).toFixed(1) + '%',
      })
    }
  } catch (e) {
    console.error(`Error parsing ${file}:`, e.message)
  }
})

report.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio))

console.log('Files in messages/ with high resemblance to English:')
report.forEach((item) => {
  console.log(`${item.file}: ${item.ratio} identical`)
})
