import { useState, useCallback } from 'react';
import type { UserProgress, EQScores, AgeGroup } from '../lib/types';
import { getProgress, saveProgress, completeExercise as completeEx, saveAssessment as saveAssess } from '../lib/storage';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getProgress);

  const completeExercise = useCallback((exerciseId: string) => {
    setProgress(prev => {
      const updated = completeEx(prev, exerciseId);
      return updated;
    });
  }, []);

  const saveAssessment = useCallback((scores: EQScores) => {
    setProgress(prev => {
      const updated = saveAssess(prev, scores);
      return updated;
    });
  }, []);

  const setAgeGroup = useCallback((ageGroup: AgeGroup) => {
    setProgress(prev => {
      const updated = { ...prev, ageGroup };
      saveProgress(updated);
      return updated;
    });
  }, []);

  return {
    progress,
    completeExercise,
    saveAssessment,
    setAgeGroup,
  };
}
