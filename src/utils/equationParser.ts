import { Fraction } from './fraction';

/**
 * Parses freeform quadratic equations into { a, b, c } Fractions.
 * Supports:
 * - "2x^2 + 8x - 10 = 0"
 * - "x^2 - 6x + 5"
 * - "-3x^2 + 5x = -2"
 * - "x^2 + 5x = 6"
 * - "y = 2x^2 - 4x + 8"
 */
export function parseQuadraticString(input: string): { a: string; b: string; c: string } | null {
  const clean = input
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^y=/, '')
    .replace(/^f\(x\)=/, '');

  if (!clean) return null;

  // Split by '=' if present
  let lhs = clean;
  let rhs = '0';
  if (clean.includes('=')) {
    const sides = clean.split('=');
    if (sides.length === 2) {
      lhs = sides[0];
      rhs = sides[1];
    }
  }

  // Parse terms from LHS (+ terms) and RHS (- terms)
  let aVal = new Fraction(0);
  let bVal = new Fraction(0);
  let cVal = new Fraction(0);

  const parseSide = (sideStr: string, multiplier: number) => {
    // Match terms with signed prefix: (+ or - or start) followed by term
    const termRegex = /([+-]?[^+-]+)/g;
    let match: RegExpExecArray | null;

    while ((match = termRegex.exec(sideStr)) !== null) {
      const term = match[1].trim();
      if (!term) continue;

      if (term.includes('x^2') || term.includes('x²')) {
        let coeffStr = term.replace('x^2', '').replace('x²', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        if (coeffStr === '-') coeffStr = '-1';
        const parsed = Fraction.parse(coeffStr);
        if (parsed) aVal = aVal.add(parsed.mul(multiplier));
      } else if (term.includes('x')) {
        let coeffStr = term.replace('x', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        if (coeffStr === '-') coeffStr = '-1';
        const parsed = Fraction.parse(coeffStr);
        if (parsed) bVal = bVal.add(parsed.mul(multiplier));
      } else {
        // Pure constant
        const parsed = Fraction.parse(term);
        if (parsed) cVal = cVal.add(parsed.mul(multiplier));
      }
    }
  };

  parseSide(lhs, 1);
  parseSide(rhs, -1);

  if (aVal.isZero() && bVal.isZero() && cVal.isZero()) {
    return null;
  }

  return {
    a: aVal.toString(),
    b: bVal.toString(),
    c: cVal.toString(),
  };
}
