import { useState } from 'react';
import type { Page, ExerciseCategory } from '../lib/types';
import { exercises, categoryInfo } from '../lib/data';
import './ExercisesPage.css';

interface ExercisesPageProps {
  onNavigate: (page: Page) => void;
  completedExercises: string[];
  onSelectExercise: (id: string) => void;
}

const categories: (ExerciseCategory | 'all')[] = ['all', 'empathy', 'self-regulation', 'conflict-resolution', 'social-skills'];

export function ExercisesPage({ onNavigate, completedExercises, onSelectExercise }: ExercisesPageProps) {
  const [activeCategory, setActiveCategory] = useState<ExerciseCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? exercises
    : exercises.filter(e => e.category === activeCategory);

  const handleExerciseClick = (id: string) => {
    onSelectExercise(id);
    onNavigate('exercise-detail');
  };

  return (
    <div className="exercises-page">
      <div className="container">
        <div className="exercises-page__header">
          <h1 className="exercises-page__title">Exercise Library</h1>
          <p className="exercises-page__subtitle">
            Interactive exercises to build emotional intelligence. Pick one and start growing today.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="exercises-page__tabs" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`exercises-page__tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat === 'all' ? '✨ All' : `${categoryInfo[cat].icon} ${categoryInfo[cat].label}`}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        {filtered.length === 0 ? (
          <div className="exercises-page__empty">
            <div className="exercises-page__empty-icon">🔍</div>
            <h3 className="exercises-page__empty-title">No exercises found</h3>
            <p className="exercises-page__empty-desc">Try selecting a different category.</p>
            <button className="btn btn--secondary" onClick={() => setActiveCategory('all')}>
              Show All Exercises
            </button>
          </div>
        ) : (
          <div className="exercises-page__grid">
            {filtered.map((exercise) => {
              const isCompleted = completedExercises.includes(exercise.id);
              const info = categoryInfo[exercise.category];
              return (
                <button
                  key={exercise.id}
                  className={`exercise-card ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleExerciseClick(exercise.id)}
                  aria-label={`${exercise.title}${isCompleted ? ' (completed)' : ''} — ${exercise.duration}, ${exercise.difficulty}`}
                >
                  {isCompleted && <div className="exercise-card__check" aria-hidden="true">✓</div>}
                  <div className="exercise-card__icon" aria-hidden="true">{exercise.icon}</div>
                  <div className="exercise-card__content">
                    <div className="exercise-card__category" style={{ color: info.color }}>
                      {info.icon} {info.label}
                    </div>
                    <h3 className="exercise-card__title">{exercise.title}</h3>
                    <p className="exercise-card__desc">{exercise.description}</p>
                    <div className="exercise-card__meta">
                      <span className="exercise-card__duration">⏱ {exercise.duration}</span>
                      <span className={`exercise-card__difficulty exercise-card__difficulty--${exercise.difficulty}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
