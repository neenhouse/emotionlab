import type { Page, UserProgress } from '../lib/types';
import { exercises, categoryInfo, badges as allBadges } from '../lib/data';
import { RadarChart } from '../components/RadarChart';
import './ProgressPage.css';

interface ProgressPageProps {
  progress: UserProgress;
  onNavigate: (page: Page) => void;
}

export function ProgressPage({ progress, onNavigate }: ProgressPageProps) {
  const completedCount = progress.completedExercises.length;
  const totalExercises = exercises.length;
  const completionPercent = Math.round((completedCount / totalExercises) * 100);

  const categoryCounts = exercises.reduce((acc, ex) => {
    const completed = progress.completedExercises.includes(ex.id);
    if (!acc[ex.category]) acc[ex.category] = { total: 0, completed: 0 };
    acc[ex.category].total++;
    if (completed) acc[ex.category].completed++;
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  return (
    <div className="progress-page">
      <div className="container">
        <div className="progress-page__header">
          <h1 className="progress-page__title">Your Progress</h1>
          <p className="progress-page__subtitle">
            Track your emotional intelligence journey. Every exercise matters.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="progress-page__stats">
          <div className="stat-card stat-card--streak">
            <div className="stat-card__icon" aria-hidden="true">🔥</div>
            <div className="stat-card__value">{progress.dailyStreak}</div>
            <div className="stat-card__label">Day Streak</div>
          </div>
          <div className="stat-card stat-card--exercises">
            <div className="stat-card__icon" aria-hidden="true">✅</div>
            <div className="stat-card__value">{completedCount}/{totalExercises}</div>
            <div className="stat-card__label">Exercises Done</div>
          </div>
          <div className="stat-card stat-card--badges">
            <div className="stat-card__icon" aria-hidden="true">🏅</div>
            <div className="stat-card__value">{progress.badges.length}</div>
            <div className="stat-card__label">Badges Earned</div>
          </div>
          <div className="stat-card stat-card--progress">
            <div className="stat-card__icon" aria-hidden="true">📊</div>
            <div className="stat-card__value">{completionPercent}%</div>
            <div className="stat-card__label">Complete</div>
          </div>
        </div>

        {/* EQ Scores */}
        {progress.assessmentScores && (
          <div className="progress-page__eq-section">
            <h2 className="progress-page__section-title">EQ Profile</h2>
            <div className="progress-page__eq-card">
              <RadarChart scores={progress.assessmentScores} size={260} />
              <button className="btn btn--secondary" onClick={() => onNavigate('results')}>
                View Full Results
              </button>
            </div>
          </div>
        )}

        {!progress.assessmentScores && (
          <div className="progress-page__eq-section">
            <div className="progress-page__empty-eq">
              <span className="progress-page__empty-eq-icon">🧭</span>
              <h3>Take Your EQ Assessment</h3>
              <p>Discover your emotional strengths and growth areas with our scenario-based quiz.</p>
              <button className="btn btn--primary" onClick={() => onNavigate('assessment')}>
                Start Assessment
              </button>
            </div>
          </div>
        )}

        {/* Category Progress */}
        <div className="progress-page__categories">
          <h2 className="progress-page__section-title">Category Progress</h2>
          <div className="progress-page__category-grid">
            {Object.entries(categoryCounts).map(([cat, counts]) => {
              const info = categoryInfo[cat];
              const pct = Math.round((counts.completed / counts.total) * 100);
              return (
                <div key={cat} className="category-progress-card">
                  <div className="category-progress-card__header">
                    <span className="category-progress-card__icon">{info.icon}</span>
                    <span className="category-progress-card__label">{info.label}</span>
                    <span className="category-progress-card__count">
                      {counts.completed}/{counts.total}
                    </span>
                  </div>
                  <div className="category-progress-card__bar">
                    <div
                      className="category-progress-card__fill"
                      style={{ width: `${pct}%`, background: info.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="progress-page__badges">
          <h2 className="progress-page__section-title">Badges</h2>
          <div className="progress-page__badge-grid">
            {allBadges.map((badge) => {
              const earned = progress.badges.find(b => b.id === badge.id);
              return (
                <div
                  key={badge.id}
                  className={`badge-card ${earned ? 'earned' : ''}`}
                >
                  <div className="badge-card__icon">{badge.icon}</div>
                  <div className="badge-card__name">{badge.name}</div>
                  <div className="badge-card__desc">{badge.description}</div>
                  {earned && (
                    <div className="badge-card__date">
                      Earned {earned.earnedDate}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {completedCount < totalExercises && (
          <div className="progress-page__cta">
            <button className="btn btn--primary btn--lg" onClick={() => onNavigate('exercises')}>
              Continue Your Journey
              <span className="btn__arrow">&#8594;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
