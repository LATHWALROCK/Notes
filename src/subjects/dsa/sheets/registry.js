import { STRIVERS_180_SHEET } from './strivers-180-data.js';
import { STRIVERS_A2Z_SHEET } from './strivers-a2z-data.js';

export const DSA_SHEETS = [
  STRIVERS_180_SHEET,
  STRIVERS_A2Z_SHEET,
];

export function getSheetById(id) {
  return DSA_SHEETS.find((s) => s.id === id) ?? DSA_SHEETS[0];
}

export default DSA_SHEETS;

