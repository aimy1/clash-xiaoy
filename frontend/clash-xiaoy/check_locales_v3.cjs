
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const enPath = path.join(localesDir, 'en.json');

if (!fs.existsSync(enPath)) {
  console.error('Error: en.json not found at', enPath);
  process.exit(1);
}

const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const keys = Object.keys(enContent);
const totalKeys = keys.length;

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

const report = [];

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let identicalCount = 0;
    let missingCount = 0;

    keys.forEach(key => {
      if (!content[key]) {
        missingCount++;
      } else if (content[key] === enContent[key]) {
        identicalCount++;
      }
    });

    // Calculate ratio of identical strings to total keys
    const ratio = identicalCount / totalKeys;
    
    // We are looking for files that are mostly English (e.g., > 40% identical)
    // Some short words might naturally be the same, but high ratio usually means untranslated.
    if (ratio > 0.4) {
      report.push({
        file: file,
        identical: identicalCount,
        missing: missingCount,
        total: totalKeys,
        ratio: (ratio * 100).toFixed(1) + '%',
        status: 'Untranslated (English)'
      });
    } else if (missingCount > totalKeys * 0.5) {
       report.push({
        file: file,
        identical: identicalCount,
        missing: missingCount,
        total: totalKeys,
        ratio: (ratio * 100).toFixed(1) + '%',
        status: 'Broken (Wrong Keys?)'
      });
    }
  } catch (e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
});

// Sort by ratio descending
report.sort((a, b) => {
    if (a.status !== b.status) return a.status.localeCompare(b.status);
    return parseFloat(b.ratio) - parseFloat(a.ratio);
});

console.log('Problematic files:');
report.forEach(item => {
  console.log(`${item.file}: ${item.status} - ${item.ratio} identical, ${item.missing} missing keys`);
});

if (report.length === 0) {
  console.log('All files appear to be significantly different from English.');
}
