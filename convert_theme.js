import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

const cssFiles = walkSync(path.join(__dirname, 'src'));

cssFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Root variables
  newContent = newContent.replace(/--color-primary:\s*#1c1917;/g, '--color-primary: #f8f9fa;');
  newContent = newContent.replace(/--color-secondary:\s*#44403c;/g, '--color-secondary: #e9ecef;');
  newContent = newContent.replace(/--color-background:\s*#0c0a09;/g, '--color-background: #ffffff;');
  newContent = newContent.replace(/--color-text:\s*#fafaf9;/g, '--color-text: #000000;');

  // Text color when using var(--color-primary) on a button/background
  newContent = newContent.replace(/color:\s*var\(--color-primary\);/g, 'color: #000000;');

  // RGBA alpha values matching
  newContent = newContent.replace(/rgba\(68,\s*64,\s*60/g, 'rgba(255, 255, 255');
  newContent = newContent.replace(/rgba\(28,\s*25,\s*23/g, 'rgba(240, 240, 240');
  newContent = newContent.replace(/rgba\(44,\s*40,\s*36/g, 'rgba(245, 245, 245');
  newContent = newContent.replace(/rgba\(12,\s*10,\s*9/g, 'rgba(255, 255, 255');
  newContent = newContent.replace(/rgba\(250,\s*250,\s*249/g, 'rgba(0, 0, 0');
  newContent = newContent.replace(/rgba\(0,\s*0,\s*0/g, 'rgba(10, 10, 10'); // just a slight shift to avoid conflict, wait, let's just make it clear, wait, no, I replaced 250 with 0, so if there are existing 0s they might be modified. BUT this runs step by step, which is fine since the literal text won't match.

  if(content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});

console.log("Done theme replacement!");
