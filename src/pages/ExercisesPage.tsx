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
        <div className="exercises-page__tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`exercises-page__tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? '✨ All' : `${categoryInfo[cat].icon} ${categoryInfo[cat].label}`}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="exercises-page__grid">
          {filtered.map((exercise) => {
            const isCompleted = completedExercises.includes(exercise.id);
            const info = categoryInfo[exercise.category];
            return (
              <button
                key={exercise.id}
                className={`exercise-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleExerciseClick(exercise.id)}
              >
                {isCompleted && <div className="exercise-card__check">✓</div>}
                <div className="exercise-card__icon">{exercise.icon}</div>
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
      </div>
    </div>
  );
}
