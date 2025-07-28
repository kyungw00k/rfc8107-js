// Universal test file compatible with Node.js, Bun, and Deno
import { generateAdId, isValidAdId, validateAdId } from './ad-id.js';

// Simple test runner that works across all runtimes
const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const expect = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, got ${actual}`);
    }
  },
  toMatch: (pattern) => {
    if (!pattern.test(actual)) {
      throw new Error(`Expected ${actual} to match ${pattern}`);
    }
  },
  toBeUndefined: () => {
    if (actual !== undefined) {
      throw new Error(`Expected undefined, got ${actual}`);
    }
  }
});

// Test suite
test('generateAdId generates valid standard Ad-ID URN', () => {
  const urn = generateAdId();
  expect(isValidAdId(urn)).toBe(true);
  expect(urn).toMatch(/^urn:adid:[A-Z0-9]{11}$/i);
});

test('generateAdId generates valid HD Ad-ID URN', () => {
  const urn = generateAdId({ isHD: true });
  expect(isValidAdId(urn)).toBe(true);
  expect(urn).toMatch(/^urn:adid:[A-Z0-9]{11}H$/i);
});

test('isValidAdId validates correct standard Ad-ID URN', () => {
  expect(isValidAdId('urn:adid:ABCD1234567')).toBe(true);
});

test('isValidAdId validates correct HD Ad-ID URN', () => {
  expect(isValidAdId('urn:adid:ABCD1234567H')).toBe(true);
});

test('isValidAdId rejects URN with company prefix starting with 0', () => {
  expect(isValidAdId('urn:adid:0BCD1234567')).toBe(false);
});

test('isValidAdId accepts case-insensitive input', () => {
  expect(isValidAdId('urn:adid:abcd1234567h')).toBe(true);
});

test('validateAdId returns detailed validation for valid URN', () => {
  const result = validateAdId('urn:adid:ABCD1234567');
  expect(result.isValid).toBe(true);
  expect(result.error).toBeUndefined();
});

test('validateAdId returns detailed error for company prefix starting with 0', () => {
  const result = validateAdId('urn:adid:0BCD1234567');
  expect(result.isValid).toBe(false);
});

// Run tests
async function runTests() {
  let passed = 0;
  let failed = 0;
  
  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.log(`✗ ${name}: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\nTests: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    // Use appropriate exit method based on runtime
    if (typeof Deno !== 'undefined') {
      Deno.exit(1);
    } else if (typeof process !== 'undefined') {
      process.exit(1);
    }
  }
}

// Auto-run if this file is executed directly
if (import.meta.main || (typeof process !== 'undefined' && process.argv[1]?.endsWith('ad-id.test.js'))) {
  runTests();
}