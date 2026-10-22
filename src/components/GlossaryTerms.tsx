import React, { useState } from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';

export const GLOSSARY_TERMS = [
  {
    term: 'Axis of Symmetry',
    definition:
      'A vertical line that divides a parabola into two congruent mirror-image halves. For y = a(x - h)² + k, the axis of symmetry is x = h, or x = -b / (2a) in standard form.',
  },
  {
    term: 'Binomial Squared',
    definition:
      'The square of a two-term algebraic expression of the form (x + d)², which expands into the perfect square trinomial x² + 2dx + d².',
  },
  {
    term: 'Completing the Square',
    definition:
      'The algebraic method of adding a constant term (b / 2a)² to an incomplete quadratic expression to transform it into a perfect square binomial.',
  },
  {
    term: 'Discriminant (Δ = b² - 4ac)',
    definition:
      'The quantity under the radical in the quadratic formula. If Δ > 0, there are two distinct real roots; if Δ = 0, one double real root; if Δ < 0, two complex conjugate roots.',
  },
  {
    term: 'Extremum (Minimum / Maximum)',
    definition:
      'The highest or lowest point on a parabola, located precisely at the vertex (h, k). If a > 0, k is the minimum value; if a < 0, k is the maximum value.',
  },
  {
    term: 'Imaginary Unit (i)',
    definition:
      'A mathematical unit defined as i = √(-1), with the property that i² = -1. It allows roots of quadratics with negative discriminants to be expressed as complex numbers.',
  },
  {
    term: 'Parabola',
    definition:
      'The U-shaped geometric curve produced by graphing any quadratic function y = ax² + bx + c in the Cartesian coordinate plane.',
  },
  {
    term: 'Perfect Square Trinomial',
    definition:
      'A three-term quadratic expression resulting from squaring a binomial, such as x² + 6x + 9 = (x + 3)². Its constant term is always the square of half the middle coefficient.',
  },
  {
    term: 'Standard Form',
    definition:
      'The canonical form of a quadratic equation written in descending degrees: ax² + bx + c = 0, where a ≠ 0.',
  },
  {
    term: 'Vertex Form',
    definition:
      'The standard parabolic form y = a(x - h)² + k, which reveals the vertex coordinates (h, k) and axis of symmetry x = h by inspection.',
  },
];

export const GlossaryTerms: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs my-8 font-sans">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Algebra Glossary: Key Concepts & Definitions
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Essential mathematical vocabulary required for high school Algebra, Precalculus, and SAT/ACT prep.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {GLOSSARY_TERMS.map((g, idx) => (
          <div
            key={`gloss-${idx}`}
            className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-colors"
          >
            <h4 className="text-sm font-bold text-slate-900 text-indigo-950 flex items-center justify-between">
              <span>{g.term}</span>
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {g.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
