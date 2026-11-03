import { STRIVERS_180_SHEET } from './strivers-180-data.js';

export const DSA_SHEETS = [
  STRIVERS_180_SHEET,
];

export function getSheetById(id) {
  return DSA_SHEETS.find((s) => s.id === id) ?? DSA_SHEETS[0];
}

export default DSA_SHEETS;

