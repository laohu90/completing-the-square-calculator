import React, { useState } from 'react';
import { BookOpen, CheckCircle, FileText, Printer, ArrowRight } from 'lucide-react';

export const ComprehensiveGuide: React.FC = () => {
  const [worksheetProblems, setWorksheetProblems] = useState([
    { id: 1, eq: 'x^2 + 6x - 7 = 0', answer: 'x = 1, -7 | Vertex: (-3, -16)' },
    { id: 2, idStr: '2', eq: 'x^2 - 10x + 24 = 0', answer: 'x = 6, 4 | Vertex: (5, -1)' },
    { id: 3, idStr: '3', eq: 'x^2 + 8x + 12 = 0', answer: 'x = -2, -6 | Vertex: (-4, -4)' },
    { id: 4, idStr: '4', eq: '2x^2 + 8x - 10 = 0', answer: 'x = 1, -5 | Vertex: (-2, -18)' },
    { id: 5, idStr: '5', eq: 'x^2 + 4x + 1 = 0', answer: 'x = -2 ± √3 | Vertex: (-2, -3)' },
    { id: 6, idStr: '6', eq: 'x^2 - 6x + 25 = 0', answer: 'x = 3 ± 4i | Vertex: (3, 16)' },
  ]);

  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <article className="space-y-10 my-10 font-sans">
      {/* Editorial Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
          Educational Guide & Theory
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
          The Complete Masterclass on Completing the Square
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Master the algebraic technique that unifies quadratic factoring, vertex form graphing, and the historic proof of the Quadratic Formula.
        </p>
      </div>

      {/* Chapter 1: The Core Concept */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          1. What Does "Completing the Square" Actually Mean?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          In high school algebra, students often treat formulas as arbitrary rules. However, <strong>Completing the Square</strong> has a tangible geometric and algebraic meaning.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Consider the expansion of any binomial squared:
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono text-base sm:text-lg font-bold text-indigo-900">
          (x + d)² = x² + 2dx + d²
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Notice the relationship between the linear coefficient (<strong>2d</strong>) and the constant term (<strong>d²</strong>):
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
          <li>The middle coefficient is twice the value of d: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-semibold">middle = 2d</code></li>
          <li>Therefore, half of the middle coefficient is exactly d: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-semibold">d = (middle / 2)</code></li>
          <li>The missing constant required to complete the trinomial is always <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-semibold">d² = (middle / 2)²</code>!</li>
        </ul>
      </section>

      {/* Chapter 2: Deriving the Quadratic Formula */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          2. The Historic Proof: Deriving the Quadratic Formula
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Did you know that the famous Quadratic Formula is not a separate formula, but simply the universal result of completing the square on the general equation <span className="font-mono font-semibold">ax² + bx + c = 0</span>?
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Step</th>
                <th className="py-2.5 px-3 font-semibold">Mathematical Expression</th>
                <th className="py-2.5 px-3 font-semibold">Algebraic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm">
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">1. Given</td>
                <td className="py-3 px-3 text-slate-900">ax² + bx + c = 0</td>
                <td className="py-3 px-3 font-sans text-slate-600">Standard quadratic equation</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">2. Isolate c</td>
                <td className="py-3 px-3 text-slate-900">ax² + bx = -c</td>
                <td className="py-3 px-3 font-sans text-slate-600">Subtract c from both sides</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">3. Divide by a</td>
                <td className="py-3 px-3 text-slate-900">x² + (b/a)x = -c/a</td>
                <td className="py-3 px-3 font-sans text-slate-600">Make leading coefficient equal 1</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">4. Find (b/2a)²</td>
                <td className="py-3 px-3 text-amber-700 font-bold">x² + (b/a)x + (b/2a)² = -c/a + (b/2a)²</td>
                <td className="py-3 px-3 font-sans text-slate-600">Add (b / 2a)² to both sides</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">5. Factor LHS</td>
                <td className="py-3 px-3 text-slate-900">(x + b/(2a))² = (b² - 4ac) / (4a²)</td>
                <td className="py-3 px-3 font-sans text-slate-600">Common denominator on RHS</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-sans font-medium text-slate-900">6. Square Root</td>
                <td className="py-3 px-3 text-slate-900">x + b/(2a) = ±√(b² - 4ac) / (2a)</td>
                <td className="py-3 px-3 font-sans text-slate-600">Take square root with ±</td>
              </tr>
              <tr className="bg-indigo-50/50 font-bold">
                <td className="py-3.5 px-3 font-sans text-indigo-950">7. Solved</td>
                <td className="py-3.5 px-3 text-indigo-700 text-sm">x = (-b ± √(b² - 4ac)) / (2a)</td>
                <td className="py-3.5 px-3 font-sans text-indigo-950">The Quadratic Formula!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 3: Method Comparison */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          3. Solving Quadratics: Which Method Should You Use?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          On SAT, ACT, and semester exams, selecting the fastest method saves valuable minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <h4 className="text-sm font-bold text-slate-900">Factoring</h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              <strong>Best when:</strong> Coefficients are small integers and the discriminant Δ is a perfect square (0, 1, 4, 9, 16...).
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-2">✓ Fastest for clean numbers</span>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
            <h4 className="text-sm font-bold text-indigo-950">Completing the Square</h4>
            <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
              <strong>Best when:</strong> You need the vertex (h, k), graphing a parabola, writing equations of circles, or when b is an even integer.
            </p>
            <span className="text-[11px] text-indigo-700 font-semibold block mt-2">✓ Essential for geometry & vertex form</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <h4 className="text-sm font-bold text-slate-900">Quadratic Formula</h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              <strong>Best when:</strong> Coefficients involve large numbers, awkward fractions, or prime numbers where factoring fails.
            </p>
            <span className="text-[11px] text-amber-700 font-semibold block mt-2">✓ Universal fallback</span>
          </div>
        </div>
      </section>

      {/* Chapter 4: Printable Practice Worksheet */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Printable Homework & Practice Worksheet</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ideal for teachers, tutors, and students preparing for exams. Print clean PDF handouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {showAnswers ? 'Hide Answer Key' : 'Show Answer Key'}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Worksheet</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {worksheetProblems.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Problem #{p.id}</span>
                <span className="text-indigo-600">Solve by Completing Square</span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900 mt-2">
                {p.eq}
              </div>

              {showAnswers ? (
                <div className="mt-3 p-2 bg-emerald-50 rounded border border-emerald-100 text-xs font-mono text-emerald-900">
                  <strong>Answer:</strong> {p.answer}
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 text-xs text-slate-400 italic">
                  Show work: Add (b/2)², factor, and solve for x.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
