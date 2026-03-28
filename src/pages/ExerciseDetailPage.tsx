import { useState } from 'react';
import type { Page } from '../lib/types';
import type { Exercise } from '../lib/types';
import { categoryInfo } from '../lib/data';
import './ExerciseDetailPage.css';

interface ExerciseDetailPageProps {
  exercise: Exercise;
  isCompleted: boolean;
  onNavigate: (page: Page) => void;
  onComplete: (id: string) => void;
}

export function ExerciseDetailPage({ exercise, isCompleted, onNavigate, onComplete }: ExerciseDetailPageProps) {
  const [step, setStep] = useState<'scenario' | 'reflection' | 'complete'>('scenario');
  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [feeling, setFeeling] = useState<string | null>(null);
  const info = categoryInfo[exercise.category];

  const feelings = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '💪', label: 'Empowered' },
    { emoji: '😢', label: 'Moved' },
    { emoji: '🌟', label: 'Inspired' },
  ];

  const handleNextReflection = () => {
    if (reflectionIndex < exercise.reflectionPrompts.length - 1) {
      setReflectionIndex(reflectionIndex + 1);
    } else {
      setStep('complete');
      if (!isCompleted) {
        onComplete(exercise.id);
      }
    }
  };

  return (
    <div className="exercise-detail">
      <div className="container exercise-detail__inner">
        <button className="exercise-detail__back" onClick={() => onNavigate('exercises')}>
          &#8592; Back to Exercises
        </button>

        <div className="exercise-detail__header">
          <span className="exercise-detail__icon">{exercise.icon}</span>
          <div>
            <div className="exercise-detail__category" style={{ color: info.color }}>
              {info.icon} {info.label}
            </div>
            <h1 className="exercise-detail__title">{exercise.title}</h1>
            <div className="exercise-detail__meta">
              <span>⏱ {exercise.duration}</span>
              <span className={`exercise-detail__difficulty exercise-detail__difficulty--${exercise.difficulty}`}>
                {exercise.difficulty}
              </span>
            </div>
          </div>
        </div>

        {step === 'scenario' && (
          <div className="exercise-detail__section animate-fade-in-up">
            <h2 className="exercise-detail__section-title">The Scenario</h2>
            <div className="exercise-detail__scenario">
              {exercise.scenario.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'spacer' : ''}>
                  {line}
                </p>
              ))}
            </div>
            <div className="exercise-detail__actions">
              <button className="btn btn--primary btn--lg" onClick={() => setStep('reflection')}>
                I've Thought About It
                <span className="btn__arrow">&#8594;</span>
              </button>
            </div>
          </div>
        )}

        {step === 'reflection' && (
          <div className="exercise-detail__section animate-fade-in-up">
            <h2 className="exercise-detail__section-title">Reflection</h2>
            <div className="exercise-detail__reflection-progress">
              {exercise.reflectionPrompts.map((_, i) => (
                <div
                  key={i}
                  className={`exercise-detail__reflection-dot ${i <= reflectionIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="exercise-detail__reflection-card">
              <div className="exercise-detail__reflection-num">
                Prompt {reflectionIndex + 1} of {exercise.reflectionPrompts.length}
              </div>
              <p className="exercise-detail__reflection-text">
                {exercise.reflectionPrompts[reflectionIndex]}
              </p>
            </div>
            <div className="exercise-detail__actions">
              <button className="btn btn--primary btn--lg" onClick={handleNextReflection}>
                {reflectionIndex < exercise.reflectionPrompts.length - 1 ? 'Next Prompt' : 'Finish Exercise'}
                <span className="btn__arrow">&#8594;</span>
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="exercise-detail__section exercise-detail__complete animate-fade-in-up">
            <div className="exercise-detail__complete-icon">🌟</div>
            <h2 className="exercise-detail__complete-title">Great Job!</h2>
            <p className="exercise-detail__complete-text">
              You've completed "{exercise.title}". Taking time to reflect on emotions is how real growth happens.
            </p>

            <div className="exercise-detail__feeling">
              <p className="exercise-detail__feeling-label">How did that feel?</p>
              <div className="exercise-detail__feeling-grid">
                {feelings.map((f) => (
                  <button
                    key={f.label}
                    className={`exercise-detail__feeling-btn ${feeling === f.label ? 'selected' : ''}`}
                    onClick={() => setFeeling(f.label)}
                  >
                    <span className="exercise-detail__feeling-emoji">{f.emoji}</span>
                    <span className="exercise-detail__feeling-text">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="exercise-detail__actions">
              <button className="btn btn--primary btn--lg" onClick={() => onNavigate('exercises')}>
                Back to Exercises
              </button>
              <button className="btn btn--secondary btn--lg" onClick={() => onNavigate('progress')}>
                View Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
