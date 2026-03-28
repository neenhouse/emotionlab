import type { EQScores } from '../lib/types';
import './RadarChart.css';

interface RadarChartProps {
  scores: EQScores;
  size?: number;
}

const labels: { key: keyof EQScores; label: string }[] = [
  { key: 'empathy', label: 'Empathy' },
  { key: 'selfAwareness', label: 'Self-Awareness' },
  { key: 'selfRegulation', label: 'Self-Regulation' },
  { key: 'socialSkills', label: 'Social Skills' },
  { key: 'motivation', label: 'Motivation' },
];

export function RadarChart({ scores, size = 280 }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.36;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number): [number, number] => {
    const angle = startAngle + index * angleStep;
    const r = (value / 3) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  // Grid rings
  const rings = [1, 2, 3];

  // Data points
  const dataPoints = labels.map((l, i) => getPoint(i, scores[l.key]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + 'Z';

  return (
    <div className="radar-chart" role="img" aria-label="EQ Scores Radar Chart">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {/* Grid rings */}
        {rings.map(ring => {
          const ringPoints = labels.map((_, i) => getPoint(i, ring));
          const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + 'Z';
          return (
            <path
              key={ring}
              d={ringPath}
              fill="none"
              stroke="var(--gray-200)"
              strokeWidth="1"
              opacity={ring === 3 ? 0.8 : 0.4}
            />
          );
        })}

        {/* Axis lines */}
        {labels.map((_, i) => {
          const [x, y] = getPoint(i, 3);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--gray-200)"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Data area */}
        <path
          d={dataPath}
          fill="url(#radarGradient)"
          stroke="var(--violet)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="radar-chart__area"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="5"
            fill="white"
            stroke="var(--violet)"
            strokeWidth="2.5"
            className="radar-chart__point"
          />
        ))}

        {/* Labels */}
        {labels.map((l, i) => {
          const [x, y] = getPoint(i, 3.8);
          return (
            <text
              key={l.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="radar-chart__label"
              fontSize="11"
              fill="var(--text-secondary)"
              fontFamily="var(--font-body)"
              fontWeight="500"
            >
              {l.label}
            </text>
          );
        })}

        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--pink)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
