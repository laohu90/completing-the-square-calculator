import React, { useMemo, useState } from 'react';
import { CTSResult } from '../utils/completingTheSquare';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ParabolaGraphProps {
  result: CTSResult;
  title?: string;
}

export const ParabolaGraph: React.FC<ParabolaGraphProps> = ({ result, title = 'Parabola Plot' }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const a = result.a.toNumber();
  const b = result.b.toNumber();
  const c = result.c.toNumber();
  const h = result.h.toNumber();
  const k = result.k.toNumber();

  // SVG viewBox settings
  const width = 500;
  const height = 360;

  // Compute graph bounds centered on vertex (h, k)
  const { xMin, xMax, yMin, yMax, points } = useMemo(() => {
    // Range around vertex
    const xSpan = Math.max(6, Math.abs(h) * 2 + 4) / zoomLevel;
    const xMin = h - xSpan / 2;
    const xMax = h + xSpan / 2;

    // Sample y values
    const numPoints = 80;
    const pts: { x: number; y: number }[] = [];
    const step = (xMax - xMin) / numPoints;

    let localYMin = k;
    let localYMax = k;

    for (let i = 0; i <= numPoints; i++) {
      const curX = xMin + i * step;
      const curY = a * curX * curX + b * curX + c;
      pts.push({ x: curX, y: curY });
      if (curY < localYMin) localYMin = curY;
      if (curY > localYMax) localYMax = curY;
    }

    // Include 0,0 and reasonable vertical padding
    const ySpanRaw = Math.max(8, (localYMax - localYMin) * 0.7);
    const yCenter = k;
    const yMin = Math.min(0, yCenter - ySpanRaw / 2);
    const yMax = Math.max(0, yCenter + ySpanRaw / 2);

    return { xMin, xMax, yMin, yMax, points: pts };
  }, [a, b, c, h, k, zoomLevel]);

  // Coordinate transforms
  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * (width - 40) + 20;
  const toSvgY = (y: number) => height - 20 - ((y - yMin) / (yMax - yMin)) * (height - 40);

  // SVG path for parabola
  const pathD = useMemo(() => {
    if (!points.length) return '';
    return points.reduce((acc, pt, idx) => {
      const sx = toSvgX(pt.x);
      const sy = toSvgY(pt.y);
      // Clip extreme values
      const clampedY = Math.max(-50, Math.min(height + 50, sy));
      return idx === 0 ? `M ${sx} ${clampedY}` : `${acc} L ${sx} ${clampedY}`;
    }, '');
  }, [points, xMin, xMax, yMin, yMax]);

  // Grid tick intervals
  const xStep = Math.max(1, Math.round((xMax - xMin) / 8));
  const yStep = Math.max(1, Math.round((yMax - yMin) / 6));

  const xTicks = [];
  const startX = Math.ceil(xMin / xStep) * xStep;
  for (let x = startX; x <= xMax; x += xStep) {
    xTicks.push(x);
  }

  const yTicks = [];
  const startY = Math.ceil(yMin / yStep) * yStep;
  for (let y = startY; y <= yMax; y += yStep) {
    yTicks.push(y);
  }

  const originX = toSvgX(0);
  const originY = toSvgY(0);
  const vertexSvgX = toSvgX(h);
  const vertexSvgY = toSvgY(k);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h4>
          <p className="text-xs text-slate-500 font-mono">
            y = {result.a.toString()}x² + {result.b.toString()}x + {result.c.toString()}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z * 1.25))}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.5, z / 1.25))}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-[5/3.6] mt-3 bg-slate-50/50 rounded-lg overflow-hidden border border-slate-100">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Grid Ticks */}
          {xTicks.map((xt) => {
            const sx = toSvgX(xt);
            return (
              <g key={`xt-${xt}`}>
                <line x1={sx} y1="0" x2={sx} y2={height} stroke="#e2e8f0" strokeWidth="0.75" />
                <text x={sx} y={Math.min(height - 4, Math.max(14, originY + 12))} fontSize="9" fill="#94a3b8" textAnchor="middle">
                  {xt}
                </text>
              </g>
            );
          })}

          {yTicks.map((yt) => {
            const sy = toSvgY(yt);
            return (
              <g key={`yt-${yt}`}>
                <line x1="0" y1={sy} x2={width} y2={sy} stroke="#e2e8f0" strokeWidth="0.75" />
                <text x={Math.min(width - 6, Math.max(10, originX + 8))} y={sy + 3} fontSize="9" fill="#94a3b8">
                  {yt}
                </text>
              </g>
            );
          })}

          {/* X Axis */}
          <line
            x1="0"
            y1={Math.max(10, Math.min(height - 10, originY))}
            x2={width}
            y2={Math.max(10, Math.min(height - 10, originY))}
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Y Axis */}
          <line
            x1={Math.max(10, Math.min(width - 10, originX))}
            y1="0"
            x2={Math.max(10, Math.min(width - 10, originX))}
            y2={height}
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Axis of Symmetry (Dashed Line) */}
          <line
            x1={vertexSvgX}
            y1="0"
            x2={vertexSvgX}
            y2={height}
            stroke="#9333ea"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Parabola Curve */}
          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

          {/* Roots (x-intercepts) */}
          {result.roots.root1Decimal !== undefined && (
            <circle
              cx={toSvgX(result.roots.root1Decimal)}
              cy={originY}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
            />
          )}
          {result.roots.root2Decimal !== undefined && result.roots.root2Decimal !== result.roots.root1Decimal && (
            <circle
              cx={toSvgX(result.roots.root2Decimal)}
              cy={originY}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
            />
          )}

          {/* Vertex Point */}
          <circle
            cx={vertexSvgX}
            cy={vertexSvgY}
            r="6"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* Vertex Text Label */}
          <text
            x={vertexSvgX + (a > 0 ? 8 : 8)}
            y={vertexSvgY + (a > 0 ? -10 : 16)}
            fontSize="10"
            fontWeight="bold"
            fill="#b91c1c"
            className="font-mono"
          >
            V({result.h.toString()}, {result.k.toString()})
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
          <span>Vertex ({result.h.toString()}, {result.k.toString()})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-purple-600 inline-block border-t border-dashed border-purple-600"></span>
          <span>Axis x = {result.h.toString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span>Roots (x-intercepts)</span>
        </div>
      </div>
    </div>
  );
};
