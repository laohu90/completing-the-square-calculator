import React, { useState, useEffect, useMemo } from 'react';
import { solveCompletingTheSquare, CTSResult } from './utils/completingTheSquare';
import { parseQuadraticString } from './utils/equationParser';
import { translations, Language, Translations } from './i18n/translations';
import { MathView } from './components/MathView';
import { ParabolaGraph } from './components/ParabolaGraph';
import { GeometricSquareVisualizer } from './components/GeometricSquareVisualizer';
import { PracticeQuiz } from './components/PracticeQuiz';
import { CheatSheetFAQ } from './components/CheatSheetFAQ';
import { WorkedExamplesLibrary } from './components/WorkedExamplesLibrary';
import { ComprehensiveGuide } from './components/ComprehensiveGuide';
import { GlossaryTerms } from './components/GlossaryTerms';
import {
  Calculator,
  Grid,
  CheckCircle,
  HelpCircle,
  Printer,
  Copy,
  Share2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Globe,
  Sliders,
  Check,
  ChevronRight,
  ChevronLeft,
  BookOpen,
} from 'lucide-react';

const PRESETS = [
  { label: 'Basic (a=1)', a: '1', b: '6', c: '-7' },
  { label: 'Negative b', a: '1', b: '-8', c: '12' },
  { label: 'Odd b (Fractions)', a: '1', b: '5', c: '-6' },
  { label: 'Leading Coeff (a=2)', a: '2', b: '8', c: '-24' },
  { label: 'Negative a (Opens Down)', a: '-1', b: '4', c: '5' },
  { label: 'Complex Roots (i)', a: '1', b: '4', c: '13' },
  { label: 'Double Root (Δ=0)', a: '1', b: '6', c: '9' },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'solver' | 'visualizer' | 'examples' | 'practice' | 'guide' | 'faq'>('solver');

  // Input states
  const [aInput, setAInput] = useState<string>('1');
  const [bInput, setBInput] = useState<string>('6');
  const [cInput, setCInput] = useState<string>('-7');
  const [equationString, setEquationString] = useState<string>('x^2 + 6x - 7 = 0');

  // Interactive step player
  const [stepMode, setStepMode] = useState<'all' | 'player'>('all');
  const [playerIndex, setPlayerIndex] = useState<number>(0);

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t: Translations = translations[lang] || translations.en;

  // Initialize from URL hash if available (e.g. #a=2&b=8&c=-10&lang=es)
  useEffect(() => {
    try {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const params = new URLSearchParams(hash);
        const aVal = params.get('a');
        const bVal = params.get('b');
        const cVal = params.get('c');
        const lVal = params.get('lang') as Language;

        if (aVal) setAInput(aVal);
        if (bVal) setBInput(bVal);
        if (cVal) setCInput(cVal);
        if (lVal && translations[lVal]) setLang(lVal);
      }
    } catch {
      // Hash parse error fallback
    }
  }, []);

  // Solve equation
  const result: CTSResult = useMemo(() => {
    return solveCompletingTheSquare(aInput, bInput, cInput);
  }, [aInput, bInput, cInput]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApplyPreset = (p: typeof PRESETS[0]) => {
    setAInput(p.a);
    setBInput(p.b);
    setCInput(p.c);
    setPlayerIndex(0);
    const signB = Number(p.b) >= 0 ? `+ ${p.b}` : `- ${Math.abs(Number(p.b))}`;
    const signC = Number(p.c) >= 0 ? `+ ${p.c}` : `- ${Math.abs(Number(p.c))}`;
    const aStr = p.a === '1' ? '' : p.a === '-1' ? '-' : p.a;
    setEquationString(`${aStr}x^2 ${signB}x ${signC} = 0`.replace(/\s+/g, ' ').trim());
  };

  const handleEquationStringChange = (val: string) => {
    setEquationString(val);
    const parsed = parseQuadraticString(val);
    if (parsed) {
      setAInput(parsed.a);
      setBInput(parsed.b);
      setCInput(parsed.c);
      setPlayerIndex(0);
    }
  };

  const handleAChange = (val: string) => {
    setAInput(val);
    setPlayerIndex(0);
  };

  const handleBChange = (val: string) => {
    setBInput(val);
    setPlayerIndex(0);
  };

  const handleCChange = (val: string) => {
    setCInput(val);
    setPlayerIndex(0);
  };

  const handleRandomExample = () => {
    const randomA = [1, 1, 2, -1, 3][Math.floor(Math.random() * 5)];
    const randomB = [2, 4, 6, 8, 10, -4, -6, -8, 5][Math.floor(Math.random() * 9)];
    const randomC = [-12, -8, -5, 3, 5, 8, -15, 9][Math.floor(Math.random() * 8)];
    setAInput(`${randomA}`);
    setBInput(`${randomB}`);
    setCInput(`${randomC}`);
    setPlayerIndex(0);
    const signB = randomB >= 0 ? `+ ${randomB}` : `- ${Math.abs(randomB)}`;
    const signC = randomC >= 0 ? `+ ${randomC}` : `- ${Math.abs(randomC)}`;
    const aStr = randomA === 1 ? '' : randomA === -1 ? '-' : `${randomA}`;
    setEquationString(`${aStr}x^2 ${signB}x ${signC} = 0`.replace(/\s+/g, ' ').trim());
  };

  const handleCopySteps = () => {
    if (!result.isValid) return;
    const text = [
      `Completing the Square: ${aInput}x² + ${bInput}x + ${cInput} = 0`,
      `Vertex Form: ${result.vertexFormString}`,
      `Vertex: (${result.h.toString()}, ${result.k.toString()})`,
      `Magic Balancing Term: (b/2a)² = (${result.halfBOverA.toString()})² = ${result.magicConstant.toString()}`,
      `Roots: x₁ = ${result.roots.root1Exact}, x₂ = ${result.roots.root2Exact}`,
      '',
      'Step-by-step breakdown:',
      ...result.steps.map((s) => `${s.id}. ${s.mathExpression.replace(/\\/g, '')} (${s.detail || ''})`),
    ].join('\n');

    navigator.clipboard.writeText(text);
    showToast(t.copied);
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#a=${encodeURIComponent(
      aInput
    )}&b=${encodeURIComponent(bInput)}&c=${encodeURIComponent(cInput)}&lang=${lang}`;
    navigator.clipboard.writeText(url);
    showToast(t.linkCopied);
  };

  const handleSelectExample = (a: string, b: string, c: string, eq: string) => {
    setAInput(a);
    setBInput(b);
    setCInput(c);
    setEquationString(eq);
    setActiveTab('solver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded: ${eq}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (Strict 3-zone layout) */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
        >
          {t.appName}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('solver')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'solver' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabSolver}
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'visualizer' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabVisualizer}
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'examples' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabExamples}
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'practice' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabPractice}
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'guide' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabGuide}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors ${
              activeTab === 'faq' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            {t.tabFAQ}
          </button>
        </nav>

        {/* Zone 3: Language & Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50/50">
            <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              aria-label="Select Language"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
              <option value="zh">简体中文</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            title="Print Worksheet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printButton}</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="flex lg:hidden border-b border-slate-200 bg-slate-50 px-3 py-2 overflow-x-auto gap-2 no-print">
        <button
          onClick={() => setActiveTab('solver')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'solver' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabSolver}
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'visualizer' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabVisualizer}
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'examples' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabExamples}
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'practice' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabPractice}
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabGuide}
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'faq' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
          }`}
        >
          {t.tabFAQ}
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section & Headline */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {t.appTagline}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            {t.inputDescription}
          </p>

          {/* Quick Preset Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 mr-1">{t.quickExamples}</span>
            {PRESETS.map((p, idx) => (
              <button
                key={`pre-${idx}`}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md transition-colors font-medium border border-slate-200"
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Input Card */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">{t.inputHeader}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRandomExample}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.randomButton}</span>
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            {/* Direct Equation Text Input */}
            <div className="md:col-span-5">
              <label htmlFor="eq-raw-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.parseEquationLabel}
              </label>
              <input
                id="eq-raw-input"
                type="text"
                value={equationString}
                onChange={(e) => handleEquationStringChange(e.target.value)}
                placeholder={t.parseEquationPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm sm:text-base font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white"
              />
            </div>

            {/* Coefficients a, b, c */}
            <div className="md:col-span-7 grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="coeff-a-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.coeffA}
                </label>
                <input
                  id="coeff-a-input"
                  type="text"
                  value={aInput}
                  onChange={(e) => handleAChange(e.target.value)}
                  className="w-full px-3 py-2.5 text-center font-mono text-base font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  placeholder="1"
                />
              </div>

              <div>
                <label htmlFor="coeff-b-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.coeffB}
                </label>
                <input
                  id="coeff-b-input"
                  type="text"
                  value={bInput}
                  onChange={(e) => handleBChange(e.target.value)}
                  className="w-full px-3 py-2.5 text-center font-mono text-base font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  placeholder="6"
                />
              </div>

              <div>
                <label htmlFor="coeff-c-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.coeffC}
                </label>
                <input
                  id="coeff-c-input"
                  type="text"
                  value={cInput}
                  onChange={(e) => handleCChange(e.target.value)}
                  className="w-full px-3 py-2.5 text-center font-mono text-base font-semibold border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  placeholder="-7"
                />
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {!result.isValid && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs sm:text-sm text-rose-800 font-medium">
              {result.errorMessage === 'a_cannot_be_zero' ? t.error_a_zero : t.error_invalid_input}
            </div>
          )}
        </section>

        {/* Tab 1: Solver View */}
        {activeTab === 'solver' && result.isValid && (
          <div className="space-y-8">
            {/* Key Summary KPI Strip */}
            <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">{t.summaryTitle}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySteps}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copySteps}</span>
                  </button>
                  <button
                    onClick={handleShareLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{t.shareLink}</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Vertex Form */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.vertexFormLabel}
                  </span>
                  <div className="mt-1 font-mono text-base font-bold text-indigo-700">
                    <MathView expression={result.vertexFormString} />
                  </div>
                </div>

                {/* Vertex Coordinates */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.vertexLabel}
                  </span>
                  <div className="mt-1 font-mono text-base font-bold text-slate-900">
                    ({result.h.toString()}, {result.k.toString()})
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans mt-0.5 block">
                    {result.opensUp ? t.opensUp : t.opensDown}
                  </span>
                </div>

                {/* Roots */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.rootsLabel}
                  </span>
                  <div className="mt-1 font-mono text-sm sm:text-base font-bold text-slate-900">
                    x = {result.roots.root1Exact}
                    {result.roots.root1Exact !== result.roots.root2Exact && (
                      <span className="block text-xs font-medium text-slate-600">
                        x = {result.roots.root2Exact}
                      </span>
                    )}
                  </div>
                </div>

                {/* Discriminant */}
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {t.discriminantLabel}
                  </span>
                  <div className="mt-1 font-mono text-base font-bold text-slate-900">
                    Δ = {result.discriminant.toString()}
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans mt-0.5 block">
                    {result.discriminant.isZero()
                      ? '1 Double Root'
                      : result.discriminant.isNegative()
                      ? '2 Complex Roots (No x-intercept)'
                      : '2 Real Roots'}
                  </span>
                </div>
              </div>
            </section>

            {/* SPOTLIGHT: THE MAGIC BALANCING CONSTANT (b / 2a)² */}
            <section className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-950">
                    {t.magicTermHighlight}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900/90 mt-0.5 font-sans leading-relaxed">
                    {t.magicTermExplainer}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/90 p-3.5 rounded-lg border border-amber-200 text-center">
                  <span className="text-xs font-semibold text-slate-500 block">
                    1. Middle Coefficient b/a
                  </span>
                  <span className="font-mono text-lg font-bold text-slate-900 mt-1 block">
                    {result.bOverA.toString()}
                  </span>
                </div>

                <div className="bg-white/90 p-3.5 rounded-lg border border-amber-200 text-center">
                  <span className="text-xs font-semibold text-slate-500 block">
                    2. Take Half: (b / 2a)
                  </span>
                  <span className="font-mono text-lg font-bold text-indigo-700 mt-1 block">
                    {result.halfBOverA.toString()}
                  </span>
                </div>

                <div className="bg-amber-100/90 p-3.5 rounded-lg border border-amber-300 text-center shadow-xs">
                  <span className="text-xs font-bold text-amber-950 block">
                    3. Square it: (b / 2a)²
                  </span>
                  <span className="font-mono text-xl font-extrabold text-amber-900 mt-1 block">
                    {result.magicConstant.toString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-amber-900 bg-white/70 p-2.5 rounded border border-amber-200/80 font-mono">
                👉 Add <strong>{result.magicConstant.toString()}</strong> to balance both sides: (x + {result.halfBOverA.toString()})² = {result.rhsSum.toString()}
              </div>
            </section>

            {/* Split Grid: Step-by-Step Algebraic Breakdown + Interactive Parabola Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left / Main Column: Step Sequence */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">{t.stepsHeading}</h3>
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                    <button
                      onClick={() => setStepMode('all')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        stepMode === 'all'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All Steps
                    </button>
                    <button
                      onClick={() => setStepMode('player')}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        stepMode === 'player'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Step Player
                    </button>
                  </div>
                </div>

                {/* Step Player Controls (when in player mode) */}
                {stepMode === 'player' && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <button
                      onClick={() => setPlayerIndex((p) => Math.max(0, p - 1))}
                      disabled={playerIndex === 0}
                      className="p-1.5 border border-slate-200 rounded-md text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-700">
                      Step {playerIndex + 1} of {result.steps.length}
                    </span>
                    <button
                      onClick={() => setPlayerIndex((p) => Math.min(result.steps.length - 1, p + 1))}
                      disabled={playerIndex === result.steps.length - 1}
                      className="p-1.5 border border-slate-200 rounded-md text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Render Steps */}
                {result.steps
                  .filter((_, idx) => (stepMode === 'all' ? true : idx === playerIndex))
                  .map((step) => {
                    const title = (t as any)[step.titleKey] || step.titleKey;
                    const desc = (t as any)[step.descriptionKey] || step.descriptionKey;

                    return (
                      <div
                        key={`step-${step.id}`}
                        className={`p-4 sm:p-5 rounded-xl border transition-all ${
                          step.isBalancingStep
                            ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                              Step {step.id}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-0.5">{title}</h4>
                          </div>
                          {step.isBalancingStep && (
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                              Key Step
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {desc}
                        </p>

                        {/* Math Equation Block */}
                        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg overflow-x-auto">
                          <MathView
                            expression={step.mathExpression}
                            highlight={step.isBalancingStep}
                          />
                        </div>

                        {step.detail && (
                          <div className="mt-2 text-xs text-slate-500 font-sans italic">
                            💡 {step.detail}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Right Column: Parabola Coordinate Plot */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <ParabolaGraph result={result} title="Parabola Graph & Vertex" />

                {/* Quick Info Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Graph Interpretation:
                  </h4>
                  <p>
                    • <strong>Vertex:</strong> Located at ({result.h.toString()},{' '}
                    {result.k.toString()}). The curve achieves its {result.opensUp ? 'minimum' : 'maximum'} here.
                  </p>
                  <p>
                    • <strong>Axis of Symmetry:</strong> The vertical line x = {result.h.toString()} splits the parabola symmetrically.
                  </p>
                  <p>
                    • <strong>Roots (x-intercepts):</strong> Solutions where y = 0.
                  </p>
                </div>
              </div>
            </div>

            {/* In-depth worked examples and glossary directly on solver page for Google authority */}
            <WorkedExamplesLibrary onSelectExample={handleSelectExample} />
            <GlossaryTerms />
          </div>
        )}

        {/* Tab 2: Geometric Visualizer */}
        {activeTab === 'visualizer' && (
          <GeometricSquareVisualizer bValue={result.bOverA} t={t} />
        )}

        {/* Tab 3: Worked Examples Library */}
        {activeTab === 'examples' && (
          <WorkedExamplesLibrary onSelectExample={handleSelectExample} />
        )}

        {/* Tab 4: Practice & Quiz */}
        {activeTab === 'practice' && <PracticeQuiz t={t} />}

        {/* Tab 5: Complete Masterclass Guide */}
        {activeTab === 'guide' && <ComprehensiveGuide />}

        {/* Tab 6: Formulas & FAQ */}
        {activeTab === 'faq' && <CheatSheetFAQ t={t} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 px-6 mt-16 no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">{t.footerRights}</p>
            <p className="mt-0.5">{t.footerDisclaimer}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button onClick={() => setActiveTab('solver')} className="hover:text-slate-900 transition-colors">
              {t.tabSolver}
            </button>
            <button onClick={() => setActiveTab('visualizer')} className="hover:text-slate-900 transition-colors">
              {t.tabVisualizer}
            </button>
            <button onClick={() => setActiveTab('examples')} className="hover:text-slate-900 transition-colors">
              {t.tabExamples}
            </button>
            <button onClick={() => setActiveTab('practice')} className="hover:text-slate-900 transition-colors">
              {t.tabPractice}
            </button>
            <button onClick={() => setActiveTab('guide')} className="hover:text-slate-900 transition-colors">
              {t.tabGuide}
            </button>
            <button onClick={() => setActiveTab('faq')} className="hover:text-slate-900 transition-colors">
              {t.tabFAQ}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
