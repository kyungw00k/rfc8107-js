#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the ESM source
const esmContent = readFileSync(join(__dirname, '../src/ad-id.js'), 'utf8');

// Convert ESM to CJS
const cjsContent = esmContent
  .replace(/^export\s*\{([^}]+)\};?\s*$/m, (match, exports) => {
    const exportList = exports.split(',').map(e => e.trim());
    return exportList.map(exp => `module.exports.${exp} = ${exp};`).join('\n');
  });

// Write CJS version
writeFileSync(join(__dirname, '../dist/index.js'), cjsContent);
console.log('✓ CommonJS build complete');