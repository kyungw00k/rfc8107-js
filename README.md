# rfc8107-js

A JavaScript implementation of [RFC 8107](https://datatracker.ietf.org/doc/html/rfc8107) for Advertising Digital Identifiers (Ad-IDs) with full RFC compliance.

[![npm version](https://badge.fury.io/js/rfc8107-js.svg)](https://badge.fury.io/js/rfc8107-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **RFC 8107 Compliant** - Fully compliant with the official specification
- 🌐 **Universal** - Works with Node.js, Bun, and Deno
- 📦 **Dual Package** - Supports both ESM and CommonJS
- 🔒 **TypeScript** - Includes TypeScript declarations
- 🎯 **Zero Dependencies** - Lightweight with no external dependencies
- ⚡ **Fast** - Optimized for performance

## Installation

```bash
# npm
npm install rfc8107-js

# yarn  
yarn add rfc8107-js

# pnpm
pnpm add rfc8107-js

# bun
bun add rfc8107-js
```

## Usage

### ESM (ES Modules)

```javascript
import { generateAdId, isValidAdId, validateAdId } from 'rfc8107-js';

// Generate a standard Ad-ID URN
const standardId = generateAdId();
console.log(standardId); // urn:adid:ABCD1234567

// Generate a High Definition Ad-ID URN  
const hdId = generateAdId({ isHD: true });
console.log(hdId); // urn:adid:ABCD1234567H

// Validate an Ad-ID URN
console.log(isValidAdId('urn:adid:ABCD1234567')); // true
console.log(isValidAdId('urn:adid:0BCD1234567')); // false (starts with 0)

// Get detailed validation results
const result = validateAdId('urn:adid:0BCD1234567');
console.log(result); 
// { isValid: false, error: 'Company prefix cannot start with 0' }
```

### CommonJS

```javascript  
const { generateAdId, isValidAdId, validateAdId } = require('rfc8107-js');

const adId = generateAdId();
console.log(isValidAdId(adId)); // true
```

### Deno

```javascript
import { generateAdId, isValidAdId } from 'https://esm.sh/rfc8107-js';

const adId = generateAdId();
console.log(isValidAdId(adId)); // true
```

## API Reference

### `generateAdId(options?): string`

Generates an RFC 8107 compliant Ad-ID URN.

**Parameters:**
- `options` (optional): Configuration object
  - `isHD` (boolean): Whether this is a High Definition asset (adds 'H' suffix)

**Returns:** A valid Ad-ID URN string

### `isValidAdId(urn: string): boolean`

Validates an Ad-ID URN according to RFC 8107.

**Parameters:**
- `urn` (string): The URN to validate

**Returns:** `true` if valid, `false` otherwise

### `validateAdId(urn: string): ValidationResult`

Validates an Ad-ID URN with detailed error information.

**Parameters:**
- `urn` (string): The URN to validate

**Returns:** Object with `isValid` boolean and optional `error` message

## RFC 8107 Specification

The Ad-ID URN format follows: `urn:adid:[4-char-prefix][7-char-code][optional-H-suffix]`

- **Company Prefix**: 4 characters, first character must be A-Z or 1-9 (not 0)
- **Asset Identifier**: 7 alphanumeric characters (A-Z, 0-9)
- **HD Suffix**: Optional 'H' for High Definition assets

### Examples

- Standard: `urn:adid:ABCD1234567`
- High Definition: `urn:adid:ABCD1234567H`

## Testing

```bash
# Run all tests
npm test

# Test specific runtime
npm run test:node    # Node.js
npm run test:bun     # Bun  
npm run test:deno    # Deno
npm run test:jest    # Jest (legacy)
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test
```

## License

MIT © [kyungw00k](https://github.com/kyungw00k)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related

- [RFC 8107 Specification](https://datatracker.ietf.org/doc/html/rfc8107)
- [Ad-ID Registry](https://www.ad-id.org/)

## Changelog

### 1.0.0
- Initial release
- RFC 8107 compliant implementation
- Universal runtime support (Node.js, Bun, Deno)
- TypeScript declarations
- Comprehensive validation with detailed error messages
