import type { Page, EQScores } from '../lib/types';
import { RadarChart } from '../components/RadarChart';
import './ResultsPage.css';

interface ResultsPageProps {
  scores: EQScores;
  onNavigate: (page: Page) => void;
}

const dimensionDetails: { key: keyof EQScores; label: string; icon: string; color: string; description: string }[] = [
  { key: 'empathy', label: 'Empathy', icon: '💗', color: 'var(--pink)', description: 'Understanding and sharing the feelings of others' },
  { key: 'selfAwareness', label: 'Self-Awareness', icon: '🔮', color: 'var(--violet)', description: 'Recognizing your own emotions and their effects' },
  { key: 'selfRegulation', label: 'Self-Regulation', icon: '🧘', color: 'var(--teal)', description: 'Managing disruptive impulses and emotions' },
  { key: 'socialSkills', label: 'Social Skills', icon: '🤝', color: 'var(--violet-dark)', description: 'Managing relationships to move people in desired directions' },
  { key: 'motivation', label: 'Motivation', icon: '🔥', color: 'var(--amber)', description: 'Using emotional factors to achieve goals' },
];

function getLevel(score: number): string {
  if (score >= 2.5) return 'Strong';
  if (score >= 1.5) return 'Developing';
  return 'Growth Area';
}

function getLevelClass(score: number): string {
  if (score >= 2.5) return 'strong';
  if (score >= 1.5) return 'developing';
  return 'growth';
}

export function ResultsPage({ scores, onNavigate }: ResultsPageProps) {
  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;
  const strongest = dimensionDetails.reduce((best, d) =>
    scores[d.key] > scores[best.key] ? d : best
  );
  const growthArea = dimensionDetails.reduce((weakest, d) =>
    scores[d.key] < scores[weakest.key] ? d : weakest
  );

  return (
    <div className="results">
      <div className="container results__inner">
        <div className="results__header">
          <div className="results__celebration" aria-hidden="true">🎉</div>
          <h1 className="results__title">Your EQ Profile</h1>
          <p className="results__subtitle">
            Here's how your emotional intelligence breaks down across 5 key dimensions.
            Every score is a starting point for growth!
          </p>
        </div>

        <div className="results__chart-section">
          <RadarChart scores={scores} size={300} />
          <div className="results__overall">
            <div className="results__overall-score">{overallScore.toFixed(1)}</div>
            <div className="results__overall-label">Overall EQ Score</div>
            <div className="results__overall-max">out of 3.0</div>
          </div>
        </div>

        <div className="results__highlights">
          <div className="results__highlight results__highlight--strength">
            <span className="results__highlight-icon">{strongest.icon}</span>
            <div>
              <div className="results__highlight-label">Your Superpower</div>
              <div className="results__highlight-value">{strongest.label}</div>
            </div>
          </div>
          <div className="results__highlight results__highlight--growth">
            <span className="results__highlight-icon">{growthArea.icon}</span>
            <div>
              <div className="results__highlight-label">Growth Opportunity</div>
              <div className="results__highlight-value">{growthArea.label}</div>
            </div>
          </div>
        </div>

        <div className="results__dimensions">
          {dimensionDetails.map((d) => (
            <div key={d.key} className="results__dimension">
              <div className="results__dimension-header">
                <span className="results__dimension-icon">{d.icon}</span>
                <div>
                  <div className="results__dimension-name">{d.label}</div>
                  <div className="results__dimension-desc">{d.description}</div>
                </div>
                <span className={`results__dimension-level results__dimension-level--${getLevelClass(scores[d.key])}`}>
                  {getLevel(scores[d.key])}
                </span>
              </div>
              <div className="results__dimension-bar">
                <div
                  className="results__dimension-fill"
                  style={{
                    width: `${(scores[d.key] / 3) * 100}%`,
                    background: d.color,
                  }}
                />
              </div>
              <div className="results__dimension-score">{scores[d.key].toFixed(1)} / 3.0</div>
            </div>
          ))}
        </div>

        <div className="results__actions">
          <button className="btn btn--primary btn--lg" onClick={() => onNavigate('exercises')}>
            Start Building Your EQ
            <span className="btn__arrow">&#8594;</span>
          </button>
          <button className="btn btn--secondary btn--lg" onClick={() => onNavigate('assessment')}>
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
