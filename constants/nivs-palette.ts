/**
 * NIVS Group brand colors – keep in sync with `app/globals.css` and NIVSGroupPaleta.pdf.
 */
export const NIVS_PALETTE = {
  navyDeep: '#0B1F3A',
  navyMid: '#1A3558',
  navyLight: '#2C4F7C',
  gold: '#C5A847',
  goldHover: '#D4B855',
  goldPale: '#F5ECC8',
  offWhite: '#F7F6F2',
  lightGray: '#E4E2DB',
  textGray: '#5A5A5A',
} as const;

export type NivsPaletteKey = keyof typeof NIVS_PALETTE;
