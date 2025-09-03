// cleanup-imports.js
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (entry.isFile() && fullPath.endsWith('.jsx')) {
      callback(fullPath);
    }
  });
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Zeilen wie "{ useState } from 'react'" → "import { useState } from 'react'"
  content = content.replace(
    /^\s*\{\s*([^}]+)\s*\}\s*from\s+['"]react['"]/gm,
    "import { $1 } from 'react'"
  );

  // 2. Zeilen wie "import React, { useState } from 'react'" → "import { useState } from 'react'"
  content = content.replace(
    /^\s*import\s+React,\s*\{\s*([^}]+)\s*\}\s*from\s+['"]react['"]/gm,
    "import { $1 } from 'react'"
  );

  // 3. Zeilen wie "import React from 'react'" (alleine) → komplett entfernen
  content = content.replace(
    /^\s*import\s+React\s+from\s+['"]react['"]\s*;?\s*\n?/gm,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${filePath}`);
  }
}

walk(SRC_DIR, fixFile);

console.log('✨ Cleanup done!');
