/**
 * Options for generating Ad-ID URN
 */
export interface AdIdOptions {
  /** Whether this is a High Definition asset (adds 'H' suffix) */
  isHD?: boolean;
}

/**
 * Validation result with detailed error information
 */
export interface ValidationResult {
  /** Whether the URN is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
}

/**
 * Generates an Ad-ID URN according to RFC 8107
 * @param options Configuration options
 * @returns The generated Ad-ID URN
 */
export function generateAdId(options?: AdIdOptions): string;

/**
 * Validates an Ad-ID URN according to RFC 8107
 * @param urn The URN to validate
 * @returns Whether the URN is valid
 */
export function isValidAdId(urn: string): boolean;

/**
 * Validates an Ad-ID URN with detailed error information
 * @param urn The URN to validate
 * @returns Validation result with isValid boolean and error message if invalid
 */
export function validateAdId(urn: string): ValidationResult;
