const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const files = fs.readdirSync(distDir);

files.forEach(file => {
  // Se for .gz, ignora
  if (file.endsWith('.gz')) return;

  // Se existir um arquivo .gz com o mesmo nome, remove o original
  if (files.includes(file + '.gz')) {
    fs.unlinkSync(path.join(distDir, file));
  }
});