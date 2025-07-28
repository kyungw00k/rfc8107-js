import { generateAdId, isValidAdId, validateAdId } from './ad-id';

describe('Ad-ID URN', () => {
  describe('generateAdId', () => {
    test('generates valid standard Ad-ID URN', () => {
      const urn = generateAdId();
      expect(isValidAdId(urn)).toBe(true);
      expect(urn).toMatch(/^urn:adid:[A-Z0-9]{11}$/i);
    });

    test('generates valid HD Ad-ID URN', () => {
      const urn = generateAdId({ isHD: true });
      expect(isValidAdId(urn)).toBe(true);
      expect(urn).toMatch(/^urn:adid:[A-Z0-9]{11}H$/i);
    });

    test('generates valid standard Ad-ID URN when isHD is false', () => {
      const urn = generateAdId({ isHD: false });
      expect(isValidAdId(urn)).toBe(true);
      expect(urn).toMatch(/^urn:adid:[A-Z0-9]{11}$/i);
    });
  });

  describe('isValidAdId', () => {
    test('validates correct standard Ad-ID URN', () => {
      expect(isValidAdId('urn:adid:ABCD1234567')).toBe(true);
    });

    test('validates correct HD Ad-ID URN', () => {
      expect(isValidAdId('urn:adid:ABCD1234567H')).toBe(true);
    });

    test('rejects URN with invalid prefix', () => {
      expect(isValidAdId('urn:invalid:ABCD1234567')).toBe(false);
    });

    test('rejects URN with company prefix starting with 0', () => {
      expect(isValidAdId('urn:adid:0BCD1234567')).toBe(false);
    });

    test('rejects URN with invalid length', () => {
      expect(isValidAdId('urn:adid:ABCD123456')).toBe(false);
      expect(isValidAdId('urn:adid:ABCD12345678')).toBe(false);
    });

    test('rejects URN with invalid suffix', () => {
      expect(isValidAdId('urn:adid:ABCD1234567X')).toBe(false);
      expect(isValidAdId('urn:adid:ABCD1234567D')).toBe(false);
    });

    test('accepts case-insensitive input', () => {
      expect(isValidAdId('urn:adid:abcd1234567h')).toBe(true);
      expect(isValidAdId('URN:ADID:ABCD1234567H')).toBe(true);
    });
  });

  describe('validateAdId', () => {
    test('returns detailed validation for valid URN', () => {
      const result = validateAdId('urn:adid:ABCD1234567');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('returns detailed error for non-string input', () => {
      const result = validateAdId(123);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('URN must be a string');
    });

    test('returns detailed error for wrong prefix', () => {
      const result = validateAdId('urn:invalid:ABCD1234567');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('URN must start with "urn:adid:"');
    });

    test('returns detailed error for company prefix starting with 0', () => {
      const result = validateAdId('urn:adid:0BCD1234567');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Company prefix cannot start with 0');
    });

    test('returns detailed error for invalid length', () => {
      const result = validateAdId('urn:adid:ABCD123456');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Identifier must be 11-12 characters (4 prefix + 7 code + optional H suffix)');
    });

    test('returns detailed error for invalid suffix', () => {
      const result = validateAdId('urn:adid:ABCD1234567D');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Only "H" suffix is allowed for High Definition assets');
    });

    test('accepts HD suffix', () => {
      const result = validateAdId('urn:adid:ABCD1234567H');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});