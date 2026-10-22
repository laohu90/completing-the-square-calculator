import React from 'react';

interface MathViewProps {
  expression: string;
  className?: string;
  highlight?: boolean;
}

/**
 * Pure React Math Renderer for quadratic expressions, fractions, powers, and radicals.
 * High-performance, zero layout-shift, responsive typography.
 */
export const MathView: React.FC<MathViewProps> = ({ expression, className = '', highlight = false }) => {
  // Parse common LaTeX or algebraic substrings:
  // \left( ... \right)^2
  // \frac{num}{den}
  // \pm
  // \sqrt{...}

  const renderFormatted = (text: string) => {
    // Replace \pm with ±
    let t = text.replace(/\\pm/g, '±').replace(/\\times/g, '×').replace(/\\quad/g, '   ');

    // Handle fractions: \frac{A}{B}
    const fracRegex = /\\frac\{([^{}]+)\}\{([^{}]+)\}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = fracRegex.exec(t)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBasicText(t.substring(lastIndex, match.index), `txt-${lastIndex}`));
      }
      const num = match[1];
      const den = match[2];
      parts.push(
        <span
          key={`frac-${match.index}`}
          className="inline-flex flex-col items-center justify-center align-middle mx-1.5 text-[0.9em] leading-tight"
        >
          <span className="border-b border-current px-1 text-center font-medium">{num}</span>
          <span className="px-1 text-center font-medium">{den}</span>
        </span>
      );
      lastIndex = fracRegex.lastIndex;
    }

    if (lastIndex < t.length) {
      parts.push(renderBasicText(t.substring(lastIndex), `txt-${lastIndex}`));
    }

    return parts;
  };

  const renderBasicText = (sub: string, keyPrefix: string) => {
    // Clean up \left( and \right)
    let s = sub.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');

    // Handle superscripts: ^2 or ^{2}
    const supRegex = /\^\{?([0-9a-zA-Z+-]+)\}?/g;
    const tokens: React.ReactNode[] = [];
    let prev = 0;
    let m: RegExpExecArray | null;

    while ((m = supRegex.exec(s)) !== null) {
      if (m.index > prev) {
        tokens.push(renderRadicals(s.substring(prev, m.index), `${keyPrefix}-rad-${prev}`));
      }
      tokens.push(
        <sup key={`${keyPrefix}-sup-${m.index}`} className="text-[0.75em] font-semibold ml-0.5">
          {m[1]}
        </sup>
      );
      prev = supRegex.lastIndex;
    }

    if (prev < s.length) {
      tokens.push(renderRadicals(s.substring(prev), `${keyPrefix}-rad-${prev}`));
    }

    return <span key={keyPrefix}>{tokens}</span>;
  };

  const renderRadicals = (sub: string, keyPrefix: string) => {
    // Check for \sqrt{...} or √...
    const sqrtRegex = /\\sqrt\{([^{}]+)\}|√([0-9a-zA-Z./]+)/g;
    const tokens: React.ReactNode[] = [];
    let prev = 0;
    let m: RegExpExecArray | null;

    while ((m = sqrtRegex.exec(sub)) !== null) {
      if (m.index > prev) {
        tokens.push(<span key={`${keyPrefix}-t-${prev}`}>{sub.substring(prev, m.index)}</span>);
      }
      const radContent = m[1] || m[2];
      tokens.push(
        <span key={`${keyPrefix}-sqrt-${m.index}`} className="inline-flex items-center align-middle mx-1">
          <span className="text-[1.15em] font-light leading-none">√</span>
          <span className="border-t border-current px-1 text-[0.95em] -ml-0.5">{radContent}</span>
        </span>
      );
      prev = sqrtRegex.lastIndex;
    }

    if (prev < sub.length) {
      tokens.push(<span key={`${keyPrefix}-t-${prev}`}>{sub.substring(prev)}</span>);
    }

    return <span key={keyPrefix}>{tokens}</span>;
  };

  return (
    <span
      className={`font-mono text-base md:text-lg tracking-tight inline-flex items-center flex-wrap select-text ${
        highlight
          ? 'bg-amber-50 text-amber-950 font-semibold px-2 py-0.5 rounded border border-amber-200'
          : 'text-slate-900'
      } ${className}`}
    >
      {renderFormatted(expression)}
    </span>
  );
};
