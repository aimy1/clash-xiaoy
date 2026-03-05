const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const enPath = path.join(localesDir, 'en.json');
const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const enKeys = Object.keys(enContent);
const enKeyCount = enKeys.length;

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

const broken = [];
const untranslated = [];
const correct = [];

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const keys = Object.keys(content);
    
    // Check for broken keys (heuristic: starts with c_0 or very few keys)
    const hasBrokenKeys = keys.some(k => k.match(/^c_\d+$/));
    const missingKeys = enKeyCount - keys.length;
    const missingRatio = missingKeys / enKeyCount;

    if (hasBrokenKeys || missingRatio > 0.5) {
      broken.push(file);
    } else {
      // Check for untranslated (heuristic: value identical to English)
      let identicalCount = 0;
      let totalCommon = 0;
      
      keys.forEach(k => {
        if (enContent[k]) {
            totalCommon++;
            if (content[k] === enContent[k]) {
                identicalCount++;
            }
        }
      });
      
      const identicalRatio = totalCommon > 0 ? (identicalCount / totalCommon) : 0;
      
      if (identicalRatio > 0.5) {
        untranslated.push(file);
      } else {
        correct.push(file);
      }
    }
  } catch (e) {
    console.error(`Error parsing ${file}: ${e.message}`);
    broken.push(file); // Treat error as broken
  }
});

console.log('Broken Files:', broken.join(', '));
console.log('Untranslated Files:', untranslated.join(', '));
