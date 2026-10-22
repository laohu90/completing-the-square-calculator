import React, { useState } from 'react';
import { MathView } from './MathView';
import { ArrowUpRight, Search, Tag } from 'lucide-react';

export interface ExampleProblem {
  id: string;
  category: 'even' | 'odd' | 'lead-a' | 'negative' | 'irrational' | 'complex';
  categoryLabel: string;
  equation: string;
  a: string;
  b: string;
  c: string;
  vertex: string;
  roots: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export const WORKED_EXAMPLES: ExampleProblem[] = [
  {
    id: 'ex-1',
    category: 'even',
    categoryLabel: 'Standard (a=1, Even b)',
    equation: 'x^2 + 6x - 7 = 0',
    a: '1',
    b: '6',
    c: '-7',
    vertex: '(-3, -16)',
    roots: 'x = 1, x = -7',
    difficulty: 'Beginner',
    description: 'Classic textbook problem. Constant to add is (6/2)² = 9.',
  },
  {
    id: 'ex-2',
    category: 'even',
    categoryLabel: 'Standard (a=1, Even b)',
    equation: 'x^2 - 8x + 12 = 0',
    a: '1',
    b: '-8',
    c: '12',
    vertex: '(4, -4)',
    roots: 'x = 6, x = 2',
    difficulty: 'Beginner',
    description: 'Negative linear coefficient b. Constant to add is (-8/2)² = 16.',
  },
  {
    id: 'ex-3',
    category: 'odd',
    categoryLabel: 'Fractions (Odd b)',
    equation: 'x^2 + 5x - 6 = 0',
    a: '1',
    b: '5',
    c: '-6',
    vertex: '(-5/2, -49/4)',
    roots: 'x = 1, x = -6',
    difficulty: 'Intermediate',
    description: 'Requires fractional constant (5/2)² = 25/4. Great for practicing fraction arithmetic.',
  },
  {
    id: 'ex-4',
    category: 'odd',
    categoryLabel: 'Fractions (Odd b)',
    equation: 'x^2 - 3x - 10 = 0',
    a: '1',
    b: '-3',
    c: '-10',
    vertex: '(3/2, -49/4)',
    roots: 'x = 5, x = -2',
    difficulty: 'Intermediate',
    description: 'Negative odd coefficient b = -3. Constant to add is 9/4.',
  },
  {
    id: 'ex-5',
    category: 'lead-a',
    categoryLabel: 'Leading Coeff (a > 1)',
    equation: '2x^2 + 8x - 24 = 0',
    a: '2',
    b: '8',
    c: '-24',
    vertex: '(-2, -32)',
    roots: 'x = 2, x = -6',
    difficulty: 'Intermediate',
    description: 'Divide by leading coefficient 2 first: x² + 4x = 12, then add 4.',
  },
  {
    id: 'ex-6',
    category: 'lead-a',
    categoryLabel: 'Leading Coeff (a > 1)',
    equation: '3x^2 - 12x + 9 = 0',
    a: '3',
    b: '-12',
    c: '9',
    vertex: '(2, -3)',
    roots: 'x = 3, x = 1',
    difficulty: 'Intermediate',
    description: 'Factor out 3: 3(x² - 4x) = -9, completing square inside yields 3(x - 2)² - 3 = 0.',
  },
  {
    id: 'ex-7',
    category: 'lead-a',
    categoryLabel: 'Leading Coeff (a > 1)',
    equation: '2x^2 + 5x - 3 = 0',
    a: '2',
    b: '5',
    c: '-3',
    vertex: '(-5/4, -49/8)',
    roots: 'x = 1/2, x = -3',
    difficulty: 'Advanced',
    description: 'Non-divisible leading coefficient. Both a and b generate fractions.',
  },
  {
    id: 'ex-8',
    category: 'negative',
    categoryLabel: 'Negative a (Opens Down)',
    equation: '-x^2 + 4x + 5 = 0',
    a: '-1',
    b: '4',
    c: '5',
    vertex: '(2, 9)',
    roots: 'x = 5, x = -1',
    difficulty: 'Intermediate',
    description: 'Parabola opens downward. Maximum value is at vertex (2, 9).',
  },
  {
    id: 'ex-9',
    category: 'negative',
    categoryLabel: 'Negative a (Opens Down)',
    equation: '-2x^2 + 8x - 6 = 0',
    a: '-2',
    b: '8',
    c: '-6',
    vertex: '(2, 2)',
    roots: 'x = 3, x = 1',
    difficulty: 'Intermediate',
    description: 'Divide both sides by -2 to get x² - 4x + 3 = 0, then complete square.',
  },
  {
    id: 'ex-10',
    category: 'irrational',
    categoryLabel: 'Irrational Roots (Radicals)',
    equation: 'x^2 + 6x + 2 = 0',
    a: '1',
    b: '6',
    c: '2',
    vertex: '(-3, -7)',
    roots: 'x = -3 ± √7',
    difficulty: 'Advanced',
    description: 'Cannot be solved by factoring. Completing the square directly reveals roots x = -3 ± √7.',
  },
  {
    id: 'ex-11',
    category: 'irrational',
    categoryLabel: 'Irrational Roots (Radicals)',
    equation: 'x^2 - 4x - 1 = 0',
    a: '1',
    b: '-4',
    c: '-1',
    vertex: '(2, -5)',
    roots: 'x = 2 ± √5',
    difficulty: 'Advanced',
    description: 'Yields golden ratio related radical solution x = 2 ± √5.',
  },
  {
    id: 'ex-12',
    category: 'complex',
    categoryLabel: 'Complex Roots (Imaginary i)',
    equation: 'x^2 + 4x + 13 = 0',
    a: '1',
    b: '4',
    c: '13',
    vertex: '(-2, 9)',
    roots: 'x = -2 ± 3i',
    difficulty: 'Advanced',
    description: '(x + 2)² = -9. Square root of negative number produces imaginary unit i.',
  },
  {
    id: 'ex-13',
    category: 'complex',
    categoryLabel: 'Complex Roots (Imaginary i)',
    equation: 'x^2 - 6x + 25 = 0',
    a: '1',
    b: '-6',
    c: '25',
    vertex: '(3, 16)',
    roots: 'x = 3 ± 4i',
    difficulty: 'Advanced',
    description: '(x - 3)² = -16. Complex conjugate roots x = 3 ± 4i.',
  },
];

interface WorkedExamplesLibraryProps {
  onSelectExample: (a: string, b: string, c: string, eq: string) => void;
}

export const WorkedExamplesLibrary: React.FC<WorkedExamplesLibraryProps> = ({ onSelectExample }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredExamples = WORKED_EXAMPLES.filter((ex) => {
    const matchesFilter = filter === 'all' || ex.category === filter;
    const matchesSearch =
      ex.equation.toLowerCase().includes(search.toLowerCase()) ||
      ex.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Library of Worked Completing the Square Examples
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse step-by-step solutions for high school Algebra 1, Algebra 2, and College Algebra exam questions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search equations or roots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Examples ({WORKED_EXAMPLES.length})
        </button>
        <button
          onClick={() => setFilter('even')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'even' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Standard (a=1)
        </button>
        <button
          onClick={() => setFilter('odd')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'odd' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Odd Coefficients & Fractions
        </button>
        <button
          onClick={() => setFilter('lead-a')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'lead-a' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Leading Coeff (a &gt; 1)
        </button>
        <button
          onClick={() => setFilter('negative')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'negative' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Negative a (Opens Down)
        </button>
        <button
          onClick={() => setFilter('irrational')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'irrational' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Irrational (Radicals)
        </button>
        <button
          onClick={() => setFilter('complex')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            filter === 'complex' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Complex Roots (i)
        </button>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {filteredExamples.map((ex) => (
          <div
            key={ex.id}
            className="group p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm bg-white transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                <span className="text-indigo-600">{ex.categoryLabel}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    ex.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700'
                      : ex.difficulty === 'Intermediate'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {ex.difficulty}
                </span>
              </div>

              <div className="font-mono text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                <MathView expression={ex.equation} />
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {ex.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs font-mono text-slate-600">
                <div className="flex justify-between">
                  <span>Vertex:</span>
                  <span className="font-semibold text-slate-900">{ex.vertex}</span>
                </div>
                <div className="flex justify-between">
                  <span>Roots:</span>
                  <span className="font-semibold text-indigo-700">{ex.roots}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectExample(ex.a, ex.b, ex.c, ex.equation)}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <span>Solve Step-by-Step</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
