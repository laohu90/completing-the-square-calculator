/**
 * Precise Fraction and Radical Arithmetic Engine
 * Handles exact rational numbers, fraction reduction, GCD, and radical simplification.
 */

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export class Fraction {
  readonly num: number;
  readonly den: number;

  constructor(numerator: number, denominator: number = 1) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero.');
    }
    let n = Math.round(numerator);
    let d = Math.round(denominator);

    if (d < 0) {
      n = -n;
      d = -d;
    }

    const common = gcd(n, d);
    this.num = n / common;
    this.den = d / common;
  }

  static fromNumber(val: number): Fraction {
    if (Number.isInteger(val)) {
      return new Fraction(val, 1);
    }
    // Convert decimal to rational approximation (up to 6 decimal places)
    const tolerance = 1.0e-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = val;
    do {
      const a = Math.floor(b);
      let aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(val - h1 / k1) > val * tolerance && k1 < 10000);

    return new Fraction(h1, k1);
  }

  static parse(input: string | number): Fraction | null {
    if (typeof input === 'number') {
      if (isNaN(input)) return null;
      return Fraction.fromNumber(input);
    }
    const clean = input.trim();
    if (!clean) return null;

    // Check fraction form: "3/4", "-5/2", " +7 / 3 "
    if (clean.includes('/')) {
      const parts = clean.split('/');
      if (parts.length !== 2) return null;
      const n = Number(parts[0].trim());
      const d = Number(parts[1].trim());
      if (isNaN(n) || isNaN(d) || d === 0) return null;
      return new Fraction(n, d);
    }

    const n = Number(clean);
    if (isNaN(n)) return null;
    return Fraction.fromNumber(n);
  }

  add(other: Fraction | number): Fraction {
    const o = typeof other === 'number' ? Fraction.fromNumber(other) : other;
    return new Fraction(this.num * o.den + o.num * this.den, this.den * o.den);
  }

  sub(other: Fraction | number): Fraction {
    const o = typeof other === 'number' ? Fraction.fromNumber(other) : other;
    return new Fraction(this.num * o.den - o.num * this.den, this.den * o.den);
  }

  mul(other: Fraction | number): Fraction {
    const o = typeof other === 'number' ? Fraction.fromNumber(other) : other;
    return new Fraction(this.num * o.num, this.den * o.den);
  }

  div(other: Fraction | number): Fraction {
    const o = typeof other === 'number' ? Fraction.fromNumber(other) : other;
    if (o.num === 0) throw new Error('Division by zero.');
    return new Fraction(this.num * o.den, this.den * o.num);
  }

  pow(exponent: number): Fraction {
    if (exponent === 0) return new Fraction(1, 1);
    if (exponent > 0) {
      return new Fraction(Math.pow(this.num, exponent), Math.pow(this.den, exponent));
    }
    return new Fraction(Math.pow(this.den, -exponent), Math.pow(this.num, -exponent));
  }

  negate(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  abs(): Fraction {
    return new Fraction(Math.abs(this.num), this.den);
  }

  equals(other: Fraction | number): boolean {
    const o = typeof other === 'number' ? Fraction.fromNumber(other) : other;
    return this.num === o.num && this.den === o.den;
  }

  isZero(): boolean {
    return this.num === 0;
  }

  isNegative(): boolean {
    return this.num < 0;
  }

  isInteger(): boolean {
    return this.den === 1;
  }

  toNumber(): number {
    return this.num / this.den;
  }

  toString(): string {
    if (this.den === 1) return `${this.num}`;
    return `${this.num}/${this.den}`;
  }

  toSignString(): string {
    if (this.isNegative()) return `- ${Math.abs(this.num)}${this.den !== 1 ? `/${this.den}` : ''}`;
    return `+ ${this.num}${this.den !== 1 ? `/${this.den}` : ''}`;
  }
}

/**
 * Simplifies a square root: sqrt(n) = coefficient * sqrt(radicand)
 * e.g. sqrt(12) -> 2 * sqrt(3)
 */
export interface SimplifiedRadical {
  readonly coefficient: number;
  readonly radicand: number;
  readonly isRational: boolean;
}

export function simplifyRadical(n: number): SimplifiedRadical {
  const val = Math.abs(Math.round(n));
  if (val === 0) return { coefficient: 0, radicand: 0, isRational: true };
  if (val === 1) return { coefficient: 1, radicand: 1, isRational: true };

  let maxSquareFactor = 1;
  for (let i = Math.floor(Math.sqrt(val)); i >= 2; i--) {
    if (val % (i * i) === 0) {
      maxSquareFactor = i;
      break;
    }
  }

  const remainder = val / (maxSquareFactor * maxSquareFactor);
  return {
    coefficient: maxSquareFactor,
    radicand: remainder,
    isRational: remainder === 1,
  };
}

/**
 * Radical fraction simplification: sqrt(num / den) = sqrt(num * den) / den
 */
export interface SimplifiedRadicalFraction {
  readonly numeratorCoeff: number;
  readonly radicand: number;
  readonly denominator: number;
  readonly isRational: boolean;
  readonly isComplex: boolean;
  readonly exactFraction?: Fraction;
}

export function simplifyFractionSquareRoot(frac: Fraction): SimplifiedRadicalFraction {
  const isComplex = frac.isNegative();
  const absFrac = frac.abs();

  if (absFrac.isZero()) {
    return {
      numeratorCoeff: 0,
      radicand: 0,
      denominator: 1,
      isRational: true,
      isComplex: false,
      exactFraction: new Fraction(0, 1),
    };
  }

  // sqrt(num / den) = sqrt(num * den) / den
  const product = absFrac.num * absFrac.den;
  const radical = simplifyRadical(product);

  // Common factor reduction: gcd(radical.coefficient, absFrac.den)
  const common = gcd(radical.coefficient, absFrac.den);
  const nCoeff = radical.coefficient / common;
  const den = absFrac.den / common;

  const isRational = radical.isRational;
  const exactFraction = isRational
    ? new Fraction(nCoeff, den)
    : undefined;

  return {
    numeratorCoeff: nCoeff,
    radicand: radical.radicand,
    denominator: den,
    isRational,
    isComplex,
    exactFraction,
  };
}
