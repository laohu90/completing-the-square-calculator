import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Translations } from '../i18n/translations';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, Award, Flame } from 'lucide-react';

interface PracticeQuizProps {
  t: Translations;
}

interface Question {
  id: number;
  prompt: string;
  expression: string;
  correctAnswer: string;
  options: string[];
  hint: string;
  explanation: string;
}

const generateQuestions = (): Question[] => [
  {
    id: 1,
    prompt: 'What constant must be added to complete the square for:',
    expression: 'x² + 8x + ___',
    correctAnswer: '16',
    options: ['8', '16', '64', '4'],
    hint: 'Take half of the linear coefficient (8 / 2 = 4) and square it (4²).',
    explanation: 'b = 8 → (b/2) = 4 → (b/2)² = 4² = 16. Adding 16 yields (x + 4)²',
  },
  {
    id: 2,
    prompt: 'What constant must be added to complete the square for:',
    expression: 'x² - 10x + ___',
    correctAnswer: '25',
    options: ['-25', '20', '25', '100'],
    hint: 'Take half of -10, which is -5, then square it: (-5)²',
    explanation: 'b = -10 → (b/2) = -5 → (-5)² = +25. Adding 25 yields (x - 5)²',
  },
  {
    id: 3,
    prompt: 'Find the vertex (h, k) of the quadratic function:',
    expression: 'y = x² - 6x + 5',
    correctAnswer: '(3, -4)',
    options: ['(3, -4)', '(-3, -4)', '(3, 5)', '(-6, 5)'],
    hint: 'Complete the square: y = (x² - 6x + 9) + 5 - 9 = (x - 3)² - 4.',
    explanation: 'In vertex form y = (x - 3)² - 4, the vertex is (h, k) = (3, -4).',
  },
  {
    id: 4,
    prompt: 'What constant completes the square when the linear term has an odd coefficient:',
    expression: 'x² + 5x + ___',
    correctAnswer: '25/4',
    options: ['25/4', '5/2', '25/2', '5/4'],
    hint: 'b = 5 → half is 5/2. Square the fraction: (5/2)²',
    explanation: 'b = 5 → (b/2) = 5/2 → (5/2)² = 25/4. Yields (x + 5/2)²',
  },
  {
    id: 5,
    prompt: 'When completing the square for 2x² + 12x = 10, what must be factored out first?',
    expression: '2x² + 12x = 10',
    correctAnswer: 'Factor out 2',
    options: ['Factor out 2', 'Factor out 12', 'Factor out x', 'Add 36 to both sides'],
    hint: 'The coefficient of x² must be 1. Divide all terms by 2 or factor out 2.',
    explanation: 'Divide by 2: x² + 6x = 5. Then add (6/2)² = 9 to both sides.',
  },
  {
    id: 6,
    prompt: 'What is the factored binomial squared for:',
    expression: 'x² - 14x + 49',
    correctAnswer: '(x - 7)²',
    options: ['(x - 7)²', '(x + 7)²', '(x - 14)²', '(x - 49)²'],
    hint: 'Notice that 49 = (-7)² and -14 = 2(-7).',
    explanation: 'x² - 14x + 49 is a perfect square trinomial equal to (x - 7)²',
  },
];

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ t }) => {
  const [questions] = useState<Question[]>(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const currentQ = questions[currentIndex % questions.length];

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // no-op if canvas blocked
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setCurrentIndex((i) => (i + 1) % questions.length);
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{t.practiceTitle}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{t.practiceSubtitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
            <Award className="w-4 h-4" />
            <span>{t.scoreLabel}: <strong className="font-mono text-sm">{score}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
            <Flame className="w-4 h-4" />
            <span>{t.streakLabel}: <strong className="font-mono text-sm">{streak}</strong></span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="my-6">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Problem #{currentIndex + 1}
        </span>
        <h4 className="text-base font-semibold text-slate-800 mt-1">{currentQ.prompt}</h4>

        {/* Expression Banner */}
        <div className="my-4 py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-900 tracking-wide">
            {currentQ.expression}
          </span>
        </div>

        {/* Hint button & Box */}
        <div className="mb-4">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{t.hintButton}</span>
            </button>
          ) : (
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-900 leading-relaxed">
              <strong>Hint:</strong> {currentQ.hint}
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt, idx) => {
            let btnClass = 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-slate-50 text-slate-800';

            if (selectedOption === opt) {
              btnClass = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-semibold shadow-xs';
            }

            if (isSubmitted) {
              if (opt === currentQ.correctAnswer) {
                btnClass = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
              } else if (selectedOption === opt) {
                btnClass = 'border-red-500 bg-red-50 text-red-950';
              } else {
                btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={`opt-${idx}`}
                onClick={() => handleSelect(opt)}
                disabled={isSubmitted}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-sm font-mono transition-all text-left ${btnClass}`}
              >
                <span>{opt}</span>
                {isSubmitted && opt === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && selectedOption === opt && opt !== currentQ.correctAnswer && (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isSubmitted && (
          <div
            className={`mt-5 p-4 rounded-xl border ${
              isCorrect ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <h5
                className={`text-sm font-bold ${
                  isCorrect ? 'text-emerald-900' : 'text-rose-900'
                }`}
              >
                {isCorrect ? t.correctAnswer : t.wrongAnswer}
              </h5>
            </div>
            <p className="text-xs text-slate-700 mt-1.5 pl-7 leading-relaxed font-mono">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            {t.submitAnswer}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            <span>{t.nextQuestion}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
