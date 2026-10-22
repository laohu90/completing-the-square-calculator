import React, { useState } from 'react';
import { Translations } from '../i18n/translations';
import { ChevronDown, AlertTriangle, BookOpen, Check } from 'lucide-react';

interface CheatSheetFAQProps {
  t: Translations;
}

export const CheatSheetFAQ: React.FC<CheatSheetFAQProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Completing the Square, and why is it taught in Algebra?',
      a: 'Completing the square is an algebraic technique used to transform any quadratic expression ax² + bx + c into a perfect square binomial squared: a(x - h)² + k. It serves three crucial purposes: (1) Finding the exact vertex and axis of symmetry of parabolas, (2) Solving quadratic equations when factoring is difficult or impossible, and (3) Deriving the famous Quadratic Formula itself.',
    },
    {
      q: 'How do you derive the Quadratic Formula using Completing the Square?',
      a: 'Start with ax² + bx + c = 0. Divide by a: x² + (b/a)x = -c/a. Half the middle coefficient is b/(2a), and its square is b²/(4a²). Add this to both sides: (x + b/(2a))² = b²/(4a²) - c/a = (b² - 4ac)/(4a²). Taking square roots gives x + b/(2a) = ±√(b² - 4ac) / (2a). Subtracting b/(2a) yields x = (-b ± √(b² - 4ac)) / (2a)!',
    },
    {
      q: 'What should you do if the leading coefficient a is not 1 (a ≠ 1)?',
      a: 'Always factor out or divide through by a first! For example, with 3x² + 12x + 7 = 0, divide by 3 to get x² + 4x = -7/3. Then take half of 4 (which is 2), square it (2² = 4), and add 4 to both sides: (x + 2)² = -7/3 + 12/3 = 5/3.',
    },
    {
      q: 'What does a negative number on the right-hand side mean?',
      a: 'If you arrive at (x - h)² = -K (where -K < 0), taking the square root requires imaginary numbers. Since √(-1) = i, the roots are complex conjugates: x = h ± i√K. On the Cartesian graph, this means the parabola never intersects the x-axis.',
    },
    {
      q: 'How do you convert vertex form y = a(x - h)² + k back to standard form?',
      a: 'Expand the squared binomial (x - h)² = x² - 2hx + h², distribute the leading coefficient a: ax² - 2ahx + ah², and combine ah² + k into the constant term c.',
    },
  ];

  return (
    <div className="space-y-8 my-6">
      {/* Formula Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Quadratic Forms & Formula Cheat Sheet</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Form Name</th>
                <th className="py-2.5 px-3 font-semibold">Algebraic Formula</th>
                <th className="py-2.5 px-3 font-semibold">Key Information Revealed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">Standard Form</td>
                <td className="py-3 px-3 text-indigo-700 font-bold">y = ax² + bx + c</td>
                <td className="py-3 px-3 font-sans text-slate-600">
                  Y-intercept is (0, c); Parabola opens up if a &gt; 0, down if a &lt; 0.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">Vertex Form</td>
                <td className="py-3 px-3 text-indigo-700 font-bold">y = a(x - h)² + k</td>
                <td className="py-3 px-3 font-sans text-slate-600">
                  Vertex at (h, k); Axis of symmetry x = h; Minimum/Maximum is k.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">The Magic Constant</td>
                <td className="py-3 px-3 text-amber-700 font-bold">(b / 2a)² or (B / 2)²</td>
                <td className="py-3 px-3 font-sans text-slate-600">
                  The exact constant term required to complete the perfect square trinomial.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">Factored (Intercept) Form</td>
                <td className="py-3 px-3 text-indigo-700 font-bold">y = a(x - r₁)(x - r₂)</td>
                <td className="py-3 px-3 font-sans text-slate-600">
                  X-intercepts (roots) at (r₁, 0) and (r₂, 0).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Traps Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">{t.commonTrapsTitle}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-950">{t.trap1Title}</h4>
            <p className="text-xs text-amber-900 mt-2 leading-relaxed">{t.trap1Desc}</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-950">{t.trap2Title}</h4>
            <p className="text-xs text-amber-900 mt-2 leading-relaxed">{t.trap2Desc}</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200">
            <h4 className="text-sm font-bold text-amber-950">{t.trap3Title}</h4>
            <p className="text-xs text-amber-900 mt-2 leading-relaxed">{t.trap3Desc}</p>
          </div>
        </div>
      </div>

      {/* Accordion FAQ */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{t.faqTitle}</h3>
        <p className="text-xs text-slate-500 mb-5">{t.faqSubtitle}</p>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={`faq-${idx}`} className="py-3.5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex items-center justify-between w-full text-left font-medium text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-sm pr-4 font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
