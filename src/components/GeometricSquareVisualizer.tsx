import React, { useState, useEffect } from 'react';
import { Fraction } from '../utils/fraction';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface GeometricSquareVisualizerProps {
  bValue: Fraction;
  t: Translations;
}

export const GeometricSquareVisualizer: React.FC<GeometricSquareVisualizerProps> = ({ bValue, t }) => {
  const [stage, setStage] = useState<number>(3); // 0 to 4
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [customB, setCustomB] = useState<number>(bValue.toNumber() || 6);

  // If external bValue changes, update customB (if valid positive or handle sign)
  useEffect(() => {
    const n = Math.abs(bValue.toNumber());
    if (n > 0 && n <= 16) {
      setCustomB(n);
    }
  }, [bValue]);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const bNum = Math.abs(customB) || 6;
  const halfB = bNum / 2;
  const missingCornerArea = halfB * halfB;

  // Geometry dimensions for SVG rendering
  const xSize = 160;
  // Scaled rectangle width proportional to halfB
  const rectW = Math.min(100, Math.max(35, (halfB / 4) * 50));

  const totalW = xSize + rectW + 80;
  const totalH = xSize + rectW + 80;

  const stageDescriptions = [
    {
      title: '1. Original Terms: x² + bx',
      desc: `We start with a blue square of side x (area x²) plus a green rectangle of area ${bNum}x (dimensions x × ${bNum}).`,
    },
    {
      title: '2. Split the Linear Term bx in Half',
      desc: `Divide the green rectangle into two equal strips of width b/2 = ${halfB.toFixed(1)}, each having area (${halfB.toFixed(1)})x.`,
    },
    {
      title: '3. Reposition into an L-Shape',
      desc: `Place one strip on the right side of x² and one strip underneath x². Notice the incomplete corner!`,
    },
    {
      title: '4. The Missing Corner: (b/2)²',
      desc: `Notice the empty space in the bottom-right corner: it has width b/2 = ${halfB.toFixed(1)} and height b/2 = ${halfB.toFixed(1)}. Its area is (${halfB.toFixed(1)})² = ${missingCornerArea.toFixed(2)}!`,
    },
    {
      title: '5. Complete the Square: (x + b/2)²',
      desc: `By filling in the yellow corner of area (${halfB.toFixed(1)})² = ${missingCornerArea.toFixed(2)}, the entire shape becomes a perfect square of side (x + ${halfB.toFixed(1)})!`,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">{t.visualizerTitle}</h3>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{t.visualizerSubtitle}</p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setIsPlaying(false);
              setStage((s) => Math.max(0, s - 1));
            }}
            disabled={stage === 0}
            className="p-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title={t.visualizerStepPrev}
            aria-label={t.visualizerStepPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-semibold px-2 text-slate-600 tabular-nums">
            {stage + 1} / 5
          </span>

          <button
            onClick={() => {
              setIsPlaying(false);
              setStage((s) => Math.min(4, s + 1));
            }}
            disabled={stage === 4}
            className="p-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title={t.visualizerStepNext}
            aria-label={t.visualizerStepNext}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 font-medium text-xs rounded-lg hover:bg-indigo-100 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> {t.visualizerPause}
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> {t.visualizerAutoPlay}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stage Explainer Banner */}
      <div className="my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="text-sm font-bold text-slate-900">{stageDescriptions[stage].title}</h4>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {stageDescriptions[stage].desc}
        </p>
      </div>

      {/* Interactive Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Drawing */}
        <div className="lg:col-span-8 flex justify-center bg-slate-50/60 p-6 rounded-xl border border-slate-100 overflow-hidden">
          <svg
            viewBox={`0 0 ${totalW} ${totalH}`}
            className="w-full max-w-[380px] h-auto select-none transition-all duration-300"
          >
            {/* Coordinate start offset */}
            <g transform="translate(35, 35)">
              {/* x² Main Square (Blue) */}
              <rect
                x="0"
                y="0"
                width={xSize}
                height={xSize}
                fill="#3b82f6"
                fillOpacity="0.85"
                stroke="#1d4ed8"
                strokeWidth="2"
                rx="3"
              />
              <text
                x={xSize / 2}
                y={xSize / 2}
                fill="#ffffff"
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-mono"
              >
                x²
              </text>
              <text x={xSize / 2} y="-10" fill="#64748b" fontSize="12" fontWeight="600" textAnchor="middle">
                Side x
              </text>
              <text x="-12" y={xSize / 2} fill="#64748b" fontSize="12" fontWeight="600" textAnchor="middle">
                x
              </text>

              {/* Stage 0: Single bx rectangle to the right */}
              {stage === 0 && (
                <g>
                  <rect
                    x={xSize + 10}
                    y="0"
                    width={rectW * 2}
                    height={xSize}
                    fill="#10b981"
                    fillOpacity="0.85"
                    stroke="#047857"
                    strokeWidth="2"
                    rx="3"
                  />
                  <text
                    x={xSize + 10 + rectW}
                    y={xSize / 2}
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-mono"
                  >
                    bx = {bNum}x
                  </text>
                  <text x={xSize + 10 + rectW} y="-10" fill="#047857" fontSize="11" fontWeight="600" textAnchor="middle">
                    Width b = {bNum}
                  </text>
                </g>
              )}

              {/* Stage 1: Two split rectangles shown side by side */}
              {stage === 1 && (
                <g>
                  <rect
                    x={xSize + 10}
                    y="0"
                    width={rectW}
                    height={xSize}
                    fill="#10b981"
                    fillOpacity="0.85"
                    stroke="#047857"
                    strokeWidth="2"
                    rx="3"
                  />
                  <text
                    x={xSize + 10 + rectW / 2}
                    y={xSize / 2}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    (b/2)x
                  </text>

                  <rect
                    x={xSize + 16 + rectW}
                    y="0"
                    width={rectW}
                    height={xSize}
                    fill="#10b981"
                    fillOpacity="0.85"
                    stroke="#047857"
                    strokeWidth="2"
                    rx="3"
                  />
                  <text
                    x={xSize + 16 + rectW * 1.5}
                    y={xSize / 2}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    (b/2)x
                  </text>
                </g>
              )}

              {/* Stage >= 2: L-shape positioning */}
              {stage >= 2 && (
                <g>
                  {/* Right Rectangle */}
                  <rect
                    x={xSize}
                    y="0"
                    width={rectW}
                    height={xSize}
                    fill="#10b981"
                    fillOpacity="0.85"
                    stroke="#047857"
                    strokeWidth="2"
                    rx="3"
                  />
                  <text
                    x={xSize + rectW / 2}
                    y={xSize / 2}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    (b/2)x
                  </text>
                  <text x={xSize + rectW / 2} y="-10" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">
                    b/2
                  </text>

                  {/* Bottom Rectangle */}
                  <rect
                    x="0"
                    y={xSize}
                    width={xSize}
                    height={rectW}
                    fill="#10b981"
                    fillOpacity="0.85"
                    stroke="#047857"
                    strokeWidth="2"
                    rx="3"
                  />
                  <text
                    x={xSize / 2}
                    y={xSize + rectW / 2}
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    (b/2)x
                  </text>
                  <text x="-15" y={xSize + rectW / 2} fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">
                    b/2
                  </text>

                  {/* Stage 3: Missing Corner Outline with dashed border */}
                  {stage === 3 && (
                    <g>
                      <rect
                        x={xSize}
                        y={xSize}
                        width={rectW}
                        height={rectW}
                        fill="#fef08a"
                        fillOpacity="0.35"
                        stroke="#eab308"
                        strokeWidth="2.5"
                        strokeDasharray="5 3"
                        rx="3"
                      />
                      <text
                        x={xSize + rectW / 2}
                        y={xSize + rectW / 2 - 6}
                        fill="#854d0e"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Missing
                      </text>
                      <text
                        x={xSize + rectW / 2}
                        y={xSize + rectW / 2 + 8}
                        fill="#854d0e"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        (b/2)²
                      </text>
                    </g>
                  )}

                  {/* Stage 4: Completed Square with Gold Corner */}
                  {stage === 4 && (
                    <g>
                      <rect
                        x={xSize}
                        y={xSize}
                        width={rectW}
                        height={rectW}
                        fill="#eab308"
                        fillOpacity="0.95"
                        stroke="#ca8a04"
                        strokeWidth="2"
                        rx="3"
                      />
                      <text
                        x={xSize + rectW / 2}
                        y={xSize + rectW / 2}
                        fill="#713f12"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="font-mono"
                      >
                        (b/2)²
                      </text>

                      {/* Outer boundary of the big completed square */}
                      <rect
                        x="-3"
                        y="-3"
                        width={xSize + rectW + 6}
                        height={xSize + rectW + 6}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        rx="6"
                      />
                    </g>
                  )}
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Live Formula & Slider Control */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
            <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {t.magicTermHighlight}
            </h5>
            <div className="mt-2 space-y-2 text-xs text-amber-950 font-mono">
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span>Linear coeff b:</span>
                <span className="font-bold">{bNum}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/60">
                <span>Half b (b/2):</span>
                <span className="font-bold">{halfB.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 bg-amber-100/70 px-1.5 rounded">
                <span className="font-bold">Missing Square (b/2)²:</span>
                <span className="font-bold text-amber-900 text-sm">{missingCornerArea.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Interactive slider for b */}
          <div className="p-4 border border-slate-200 rounded-xl">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="b-slider" className="text-xs font-bold text-slate-700">
                Adjust b coefficient:
              </label>
              <span className="font-mono text-sm font-bold text-indigo-600">{bNum}</span>
            </div>
            <input
              id="b-slider"
              type="range"
              min="2"
              max="14"
              step="2"
              value={bNum}
              onChange={(e) => setCustomB(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>b = 2</span>
              <span>b = 8</span>
              <span>b = 14</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Key Algebraic Identity:</strong>
            <div className="font-mono text-sm text-slate-900 mt-1 font-semibold">
              x² + bx + (b/2)² = (x + b/2)²
            </div>
            <div className="font-mono text-xs text-slate-700 mt-1">
              x² + {bNum}x + {missingCornerArea.toFixed(0)} = (x + {halfB.toFixed(0)})²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
