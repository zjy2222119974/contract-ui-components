const fs = require('fs');
const path = require('path');

function copyStyles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const items = fs.readdirSync(srcDir);

  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyStyles(srcPath, destPath);
    } else if (item.endsWith('.scss')) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

// 获取命令行参数
const args = process.argv.slice(2);
const outputDir = args[0] || 'lib';

console.log(`Copying SCSS files to ${outputDir}...`);
copyStyles('src', outputDir);
console.log('SCSS files copied successfully!'); 