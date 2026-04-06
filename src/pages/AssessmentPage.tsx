import { useState } from 'react';
import type { Page, EQScores } from '../lib/types';
import { assessmentQuestions } from '../lib/data';
import './AssessmentPage.css';

interface AssessmentPageProps {
  onNavigate: (page: Page) => void;
  onComplete: (scores: EQScores) => void;
}

export function AssessmentPage({ onNavigate, onComplete }: AssessmentPageProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = assessmentQuestions[currentQ];
  const progress = ((currentQ) / assessmentQuestions.length) * 100;
  const isLastQuestion = currentQ === assessmentQuestions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (isTransitioning) return;
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null || isTransitioning) return;

    setIsTransitioning(true);
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate scores
      const scores: EQScores = {
        empathy: 0,
        selfAwareness: 0,
        selfRegulation: 0,
        socialSkills: 0,
        motivation: 0,
      };

      newAnswers.forEach((answerIdx, qIdx) => {
        const q = assessmentQuestions[qIdx];
        const option = q.options[answerIdx];
        const s = option.scores;
        if (s.empathy) scores.empathy += s.empathy;
        if (s.selfAwareness) scores.selfAwareness += s.selfAwareness;
        if (s.selfRegulation) scores.selfRegulation += s.selfRegulation;
        if (s.socialSkills) scores.socialSkills += s.socialSkills;
        if (s.motivation) scores.motivation += s.motivation;
      });

      // Normalize to 0-3 scale
      const maxPossible = 3 * assessmentQuestions.length;
      scores.empathy = Math.round((scores.empathy / maxPossible) * 3 * 10) / 10;
      scores.selfAwareness = Math.round((scores.selfAwareness / maxPossible) * 3 * 10) / 10;
      scores.selfRegulation = Math.round((scores.selfRegulation / maxPossible) * 3 * 10) / 10;
      scores.socialSkills = Math.round((scores.socialSkills / maxPossible) * 3 * 10) / 10;
      scores.motivation = Math.round((scores.motivation / maxPossible) * 3 * 10) / 10;

      onComplete(scores);
      onNavigate('results');
    } else {
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="assessment">
      <div className="container assessment__inner">
        {/* Progress bar */}
        <div className="assessment__progress">
          <div
            className="assessment__progress-bar"
            role="progressbar"
            aria-valuenow={currentQ + 1}
            aria-valuemin={1}
            aria-valuemax={assessmentQuestions.length}
            aria-label={`Question ${currentQ + 1} of ${assessmentQuestions.length}`}
          >
            <div
              className="assessment__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="assessment__progress-text" aria-hidden="true">
            {currentQ + 1} of {assessmentQuestions.length}
          </span>
        </div>

        {/* Question */}
        <div className={`assessment__question ${isTransitioning ? 'fading' : ''}`}>
          <div className="assessment__question-num">Question {currentQ + 1}</div>
          <h2 className="assessment__question-text">{question.scenario}</h2>

          {/* Options */}
          <div className="assessment__options" role="group" aria-label="Choose your response">
            {question.options.map((option, i) => (
              <button
                key={i}
                className={`assessment__option ${selectedOption === i ? 'selected' : ''}`}
                onClick={() => handleSelect(i)}
                aria-pressed={selectedOption === i}
              >
                <span className="assessment__option-emoji" aria-hidden="true">{option.emoji}</span>
                <span className="assessment__option-label">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Next button */}
          <div className="assessment__actions">
            <button
              className="btn btn--primary btn--lg"
              disabled={selectedOption === null}
              onClick={handleNext}
            >
              {isLastQuestion ? 'See My Results' : 'Next Question'}
              <span className="btn__arrow">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
