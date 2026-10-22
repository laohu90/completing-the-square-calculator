import { Fraction, simplifyFractionSquareRoot, SimplifiedRadicalFraction } from './fraction';

export interface StepExplanation {
  readonly id: number;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly mathExpression: string;
  readonly detail?: string;
  readonly isBalancingStep?: boolean;
  readonly breakdown?: {
    readonly linearCoeff: Fraction;
    readonly halfCoeff: Fraction;
    readonly squaredTerm: Fraction;
    readonly addedToBothSides: Fraction;
  };
}

export interface CTSResult {
  readonly isValid: boolean;
  readonly errorMessage?: string;
  readonly a: Fraction;
  readonly b: Fraction;
  readonly c: Fraction;
  // Intermediate key components
  readonly bOverA: Fraction;
  readonly halfBOverA: Fraction; // d = b / (2a)
  readonly magicConstant: Fraction; // K = (b / 2a)^2
  readonly rhsSum: Fraction; // -c/a + K = (b^2 - 4ac) / (4a^2)
  // Vertex Form
  readonly h: Fraction; // h = -b / (2a)
  readonly k: Fraction; // k = c - b^2 / (4a)
  readonly vertexFormString: string;
  readonly opensUp: boolean;
  // Roots
  readonly discriminant: Fraction; // b^2 - 4ac
  readonly radicalInfo: SimplifiedRadicalFraction;
  readonly rootType: 'two-real-rational' | 'two-real-irrational' | 'one-real-double' | 'two-complex';
  readonly roots: {
    readonly root1Exact: string;
    readonly root2Exact: string;
    readonly root1Decimal?: number;
    readonly root2Decimal?: number;
    readonly isComplex: boolean;
  };
  // Detailed step sequence
  readonly steps: StepExplanation[];
}

export function solveCompletingTheSquare(
  aInput: string | number,
  bInput: string | number,
  cInput: string | number
): CTSResult {
  const aFrac = Fraction.parse(aInput);
  const bFrac = Fraction.parse(bInput);
  const cFrac = Fraction.parse(cInput);

  if (!aFrac || !bFrac || !cFrac) {
    return {
      isValid: false,
      errorMessage: 'invalid_coefficients',
      a: new Fraction(1),
      b: new Fraction(0),
      c: new Fraction(0),
      bOverA: new Fraction(0),
      halfBOverA: new Fraction(0),
      magicConstant: new Fraction(0),
      rhsSum: new Fraction(0),
      h: new Fraction(0),
      k: new Fraction(0),
      vertexFormString: '',
      opensUp: true,
      discriminant: new Fraction(0),
      radicalInfo: simplifyFractionSquareRoot(new Fraction(0)),
      rootType: 'one-real-double',
      roots: { root1Exact: '0', root2Exact: '0', isComplex: false },
      steps: [],
    };
  }

  if (aFrac.isZero()) {
    return {
      isValid: false,
      errorMessage: 'a_cannot_be_zero',
      a: aFrac,
      b: bFrac,
      c: cFrac,
      bOverA: new Fraction(0),
      halfBOverA: new Fraction(0),
      magicConstant: new Fraction(0),
      rhsSum: new Fraction(0),
      h: new Fraction(0),
      k: new Fraction(0),
      vertexFormString: '',
      opensUp: true,
      discriminant: new Fraction(0),
      radicalInfo: simplifyFractionSquareRoot(new Fraction(0)),
      rootType: 'one-real-double',
      roots: { root1Exact: '0', root2Exact: '0', isComplex: false },
      steps: [],
    };
  }

  const a = aFrac;
  const b = bFrac;
  const c = cFrac;

  // 1. Calculations
  const bOverA = b.div(a);
  const halfBOverA = bOverA.div(2); // d = b / (2a)
  const magicConstant = halfBOverA.pow(2); // K = (b / 2a)^2

  // Vertex Form: y = a(x - h)^2 + k
  // h = -b / (2a) = -halfBOverA
  const h = halfBOverA.negate();
  // k = c - a * K = c - (b^2 / (4a))
  const k = c.sub(a.mul(magicConstant));

  // Equation: (x + halfBOverA)^2 = rhsSum
  // rhsSum = -c/a + magicConstant = (b^2 - 4ac) / (4a^2)
  const negCOverA = c.negate().div(a);
  const rhsSum = negCOverA.add(magicConstant);

  // Discriminant: b^2 - 4ac = rhsSum * 4 * a^2
  const discriminant = b.pow(2).sub(a.mul(c).mul(4));

  // Radical info of rhsSum
  const radicalInfo = simplifyFractionSquareRoot(rhsSum);

  // Determine root type and representations
  let rootType: CTSResult['rootType'];
  let roots: CTSResult['roots'];

  if (rhsSum.isZero()) {
    rootType = 'one-real-double';
    const r = h.toString();
    roots = {
      root1Exact: r,
      root2Exact: r,
      root1Decimal: h.toNumber(),
      root2Decimal: h.toNumber(),
      isComplex: false,
    };
  } else if (rhsSum.isNegative()) {
    rootType = 'two-complex';
    // rhsSum is negative, so sqrt(rhsSum) = i * sqrt(|rhsSum|)
    let radicalStr = '';
    if (radicalInfo.isRational && radicalInfo.exactFraction) {
      radicalStr = radicalInfo.exactFraction.toString();
    } else {
      const coeff = radicalInfo.numeratorCoeff === 1 ? '' : `${radicalInfo.numeratorCoeff}`;
      radicalStr = `(${coeff}√${radicalInfo.radicand})/${radicalInfo.denominator}`;
    }

    const hStr = h.isZero() ? '' : `${h.toString()} `;
    const sign1 = h.isZero() ? '' : '+ ';
    const sign2 = h.isZero() ? '-' : '- ';

    roots = {
      root1Exact: `${hStr}${sign1}${radicalStr}i`.trim(),
      root2Exact: `${hStr}${sign2}${radicalStr}i`.trim(),
      isComplex: true,
    };
  } else {
    // rhsSum > 0
    if (radicalInfo.isRational && radicalInfo.exactFraction) {
      rootType = 'two-real-rational';
      const root1Frac = h.add(radicalInfo.exactFraction);
      const root2Frac = h.sub(radicalInfo.exactFraction);
      roots = {
        root1Exact: root1Frac.toString(),
        root2Exact: root2Frac.toString(),
        root1Decimal: root1Frac.toNumber(),
        root2Decimal: root2Frac.toNumber(),
        isComplex: false,
      };
    } else {
      rootType = 'two-real-irrational';
      const coeff = radicalInfo.numeratorCoeff === 1 ? '' : `${radicalInfo.numeratorCoeff}`;
      const radPart = `(${coeff}√${radicalInfo.radicand})/${radicalInfo.denominator}`;
      const hStr = h.isZero() ? '' : `${h.toString()} `;
      const sign1 = h.isZero() ? '' : '+ ';
      const sign2 = h.isZero() ? '-' : '- ';

      const decVal = Math.sqrt(rhsSum.toNumber());
      roots = {
        root1Exact: `${hStr}${sign1}${radPart}`.trim(),
        root2Exact: `${hStr}${sign2}${radPart}`.trim(),
        root1Decimal: h.toNumber() + decVal,
        root2Decimal: h.toNumber() - decVal,
        isComplex: false,
      };
    }
  }

  // Vertex form string
  // y = a(x - h)^2 + k
  let aPart = '';
  if (a.equals(1)) aPart = '';
  else if (a.equals(-1)) aPart = '-';
  else aPart = `${a.toString()}`;

  let insidePart = '';
  if (h.isZero()) {
    insidePart = 'x^2';
  } else if (h.isNegative()) {
    insidePart = `(x + ${h.abs().toString()})^2`;
  } else {
    insidePart = `(x - ${h.toString()})^2`;
  }

  let kPart = '';
  if (!k.isZero()) {
    kPart = k.isNegative() ? ` - ${k.abs().toString()}` : ` + ${k.toString()}`;
  }

  const vertexFormString = `y = ${aPart}${insidePart}${kPart}`;

  // 2. Generate Clear Detailed Step-by-Step Sequence
  const steps: StepExplanation[] = [];

  // Step 1: Write in Standard Form & Identify a, b, c
  const aStr = a.equals(1) ? '' : a.equals(-1) ? '-' : a.toString();
  const bSign = b.isNegative() ? `- ${b.abs().toString()}x` : b.isZero() ? '' : `+ ${b.toString()}x`;
  const cSign = c.isNegative() ? `- ${c.abs().toString()}` : c.isZero() ? '' : `+ ${c.toString()}`;
  const initialEq = `${aStr}x^2 ${bSign} ${cSign} = 0`.replace(/\s+/g, ' ').trim();

  steps.push({
    id: 1,
    titleKey: 'step1_title',
    descriptionKey: 'step1_desc',
    mathExpression: initialEq,
    detail: `a = ${a.toString()}, b = ${b.toString()}, c = ${c.toString()}`,
  });

  // Step 2: Move constant term c to the right side
  const negC = c.negate();
  steps.push({
    id: 2,
    titleKey: 'step2_title',
    descriptionKey: 'step2_desc',
    mathExpression: `${aStr}x^2 ${bSign} = ${negC.toString()}`.replace(/\s+/g, ' ').trim(),
  });

  // Step 3: Divide or factor out leading coefficient a
  if (!a.equals(1)) {
    steps.push({
      id: 3,
      titleKey: 'step3_title',
      descriptionKey: 'step3_desc',
      mathExpression: `x^2 ${bOverA.toSignString()}x = ${negCOverA.toString()}`,
      detail: `Divided all terms by a = ${a.toString()} so the x² coefficient is 1.`,
    });
  }

  // Step 4: THE SPOTLIGHT BALANCING STEP: Calculate (b / 2a)^2
  steps.push({
    id: 4,
    titleKey: 'step4_title',
    descriptionKey: 'step4_desc',
    mathExpression: `\\left(\\frac{${bOverA.toString()}}{2}\\right)^2 = \\left(${halfBOverA.toString()}\\right)^2 = ${magicConstant.toString()}`,
    isBalancingStep: true,
    breakdown: {
      linearCoeff: bOverA,
      halfCoeff: halfBOverA,
      squaredTerm: magicConstant,
      addedToBothSides: magicConstant,
    },
    detail: `Half the linear coefficient is ${halfBOverA.toString()}. Squaring it gives the balancing constant ${magicConstant.toString()}.`,
  });

  // Step 5: Add the balancing constant to both sides
  steps.push({
    id: 5,
    titleKey: 'step5_title',
    descriptionKey: 'step5_desc',
    mathExpression: `x^2 ${bOverA.toSignString()}x + ${magicConstant.toString()} = ${negCOverA.toString()} + ${magicConstant.toString()}`,
    detail: `Adding ${magicConstant.toString()} to both sides keeps the equation balanced while completing the square.`,
  });

  // Step 6: Factor the trinomial into a binomial squared & simplify RHS
  const binomialSign = halfBOverA.isNegative()
    ? `- ${halfBOverA.abs().toString()}`
    : `+ ${halfBOverA.toString()}`;
  steps.push({
    id: 6,
    titleKey: 'step6_title',
    descriptionKey: 'step6_desc',
    mathExpression: `\\left(x ${binomialSign}\\right)^2 = ${rhsSum.toString()}`,
    detail: `The left-hand side is now a perfect square trinomial! RHS: ${negCOverA.toString()} + ${magicConstant.toString()} = ${rhsSum.toString()}`,
  });

  // Step 7: Vertex Form
  steps.push({
    id: 7,
    titleKey: 'step7_title',
    descriptionKey: 'step7_desc',
    mathExpression: vertexFormString,
    detail: `Vertex coordinates: (h, k) = (${h.toString()}, ${k.toString()}). Axis of symmetry: x = ${h.toString()}.`,
  });

  // Step 8: Solve for x using the Square Root Property
  let sqrtRhsExpr = '';
  if (rhsSum.isZero()) {
    sqrtRhsExpr = `x ${binomialSign} = 0`;
  } else if (rhsSum.isNegative()) {
    sqrtRhsExpr = `x ${binomialSign} = \\pm ${radicalInfo.isRational && radicalInfo.exactFraction ? radicalInfo.exactFraction.toString() : `\\sqrt{${rhsSum.abs().toString()}}`}i`;
  } else {
    sqrtRhsExpr = `x ${binomialSign} = \\pm ${radicalInfo.isRational && radicalInfo.exactFraction ? radicalInfo.exactFraction.toString() : `\\sqrt{${rhsSum.toString()}}`}`;
  }

  steps.push({
    id: 8,
    titleKey: 'step8_title',
    descriptionKey: 'step8_desc',
    mathExpression: sqrtRhsExpr,
  });

  // Step 9: Final Roots
  steps.push({
    id: 9,
    titleKey: 'step9_title',
    descriptionKey: 'step9_desc',
    mathExpression: `x_1 = ${roots.root1Exact}, \\quad x_2 = ${roots.root2Exact}`,
    detail: roots.root1Decimal !== undefined && roots.root2Decimal !== undefined
      ? `Decimal approximations: x₁ ≈ ${roots.root1Decimal.toFixed(4)}, x₂ ≈ ${roots.root2Decimal.toFixed(4)}`
      : 'Complex conjugate solutions involving imaginary unit i = √(-1).',
  });

  return {
    isValid: true,
    a,
    b,
    c,
    bOverA,
    halfBOverA,
    magicConstant,
    rhsSum,
    h,
    k,
    vertexFormString,
    opensUp: a.toNumber() > 0,
    discriminant,
    radicalInfo,
    rootType,
    roots,
    steps,
  };
}
