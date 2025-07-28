# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a JavaScript implementation of RFC 8107 for Advertising Digital Identifiers (Ad-IDs). The codebase consists of two main files:

- `ad-id.js` - Core implementation with generation and validation functions
- `ad-id.spec.js` - Jest test suite

## Architecture

The module exports three main functions:
- `generateAdId(options)` - Generates RFC 8107 compliant Ad-ID URNs with optional HD suffix
- `isValidAdId(urn)` - Validates Ad-ID URN format using regex pattern matching
- `validateAdId(urn)` - Provides detailed validation with error messages

The Ad-ID format follows RFC 8107: `urn:adid:[4-char-prefix][7-char-code][optional-H-suffix]`
- Company prefix: First char must be A-Z or 1-9 (not 0), remaining 3 chars are A-Z or 0-9
- Asset identifier: 7 alphanumeric characters (A-Z, 0-9)
- Suffix: Only 'H' for High Definition assets (per RFC 8107)

## RFC 8107 Compliance Notes

- Company prefixes are randomly generated for testing purposes only
- In production, prefixes should be obtained from the Ad-ID Registrar
- Only 'H' suffix is supported as per RFC specification
- Case-insensitive validation as required by RFC

## Testing

The project uses Jest for testing. Run tests with:
```bash
jest
```

Tests cover:
- Generation of standard, HD, and 3D Ad-ID URNs
- Validation of correct and incorrect URN formats
- Edge cases like company prefix starting with 0