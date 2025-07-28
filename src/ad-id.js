/**
 * Ad-ID URN Implementation based on RFC 8107
 * https://datatracker.ietf.org/doc/html/rfc8107
 * 
 * Note: This implementation generates random company prefixes for testing/demo purposes.
 * In production, company prefixes should be obtained from the Ad-ID Registrar.
 */

// Generates a random alphanumeric character (A-Z, 0-9)
const generateAlphanumeric = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

// Generates a random alpha character (A-Z)
const generateAlpha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

// Generates a random numeric character (1-9)
const generateNonZeroNumeric = () => {
  return Math.floor(Math.random() * 9 + 1).toString();
};

/**
 * Generates a 4-character company prefix
 * First character must be alpha or 1-9 (not 0)
 */
const generatePrefix = () => {
  const firstChar = Math.random() < 0.5 ? generateAlpha() : generateNonZeroNumeric();
  return firstChar + Array(3).fill().map(generateAlphanumeric).join('');
};

/**
 * Generates a 7-character alphanumeric code
 */
const generateCode = () => {
  return Array(7).fill().map(generateAlphanumeric).join('');
};

/**
 * Generates an Ad-ID URN
 * @param {Object} options - Configuration options
 * @param {boolean} options.isHD - Whether this is a High Definition asset (adds 'H' suffix)
 * @returns {string} The generated Ad-ID URN
 */
const generateAdId = ({ isHD = false } = {}) => {
  const prefix = generatePrefix();
  const code = generateCode();
  const suffix = isHD ? 'H' : '';
  
  return `urn:adid:${prefix}${code}${suffix}`;
};

/**
 * Validates an Ad-ID URN according to RFC 8107
 * @param {string} urn - The URN to validate
 * @returns {boolean} Whether the URN is valid
 */
const isValidAdId = (urn) => {
  const pattern = /^urn:adid:(?![0])[A-Z0-9]{4}[A-Z0-9]{7}H?$/i;
  return pattern.test(urn);
};

/**
 * Validates an Ad-ID URN with detailed error information
 * @param {string} urn - The URN to validate
 * @returns {Object} Validation result with isValid boolean and error message if invalid
 */
const validateAdId = (urn) => {
  if (typeof urn !== 'string') {
    return { isValid: false, error: 'URN must be a string' };
  }
  
  if (!urn.startsWith('urn:adid:')) {
    return { isValid: false, error: 'URN must start with "urn:adid:"' };
  }
  
  const identifier = urn.slice(9); // Remove "urn:adid:" prefix
  
  if (identifier.length < 11 || identifier.length > 12) {
    return { isValid: false, error: 'Identifier must be 11-12 characters (4 prefix + 7 code + optional H suffix)' };
  }
  
  if (identifier[0] === '0') {
    return { isValid: false, error: 'Company prefix cannot start with 0' };
  }
  
  if (!/^[A-Z0-9]{11}H?$/i.test(identifier)) {
    return { isValid: false, error: 'Invalid characters or format in identifier' };
  }
  
  if (identifier.length === 12 && identifier[11] !== 'H' && identifier[11] !== 'h') {
    return { isValid: false, error: 'Only "H" suffix is allowed for High Definition assets' };
  }
  
  return { isValid: true };
};

export {
  generateAdId,
  isValidAdId,
  validateAdId
};


