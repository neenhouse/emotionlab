import type { UserProgress, EQScores } from './types';
import { badges as allBadges } from './data';

const STORAGE_KEY = 'emotionlab_progress';

const defaultProgress: UserProgress = {
  completedExercises: [],
  assessmentScores: null,
  dailyStreak: 0,
  lastActiveDate: '',
  badges: [],
  ageGroup: null,
};

export function getProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultProgress };
    return JSON.parse(stored);
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (progress.lastActiveDate === today) {
    return progress;
  }

  const newStreak = progress.lastActiveDate === yesterday
    ? progress.dailyStreak + 1
    : 1;

  return {
    ...progress,
    dailyStreak: newStreak,
    lastActiveDate: today,
  };
}

export function completeExercise(progress: UserProgress, exerciseId: string): UserProgress {
  if (progress.completedExercises.includes(exerciseId)) return progress;

  let updated = {
    ...progress,
    completedExercises: [...progress.completedExercises, exerciseId],
  };

  updated = updateStreak(updated);
  updated = checkBadges(updated);
  saveProgress(updated);
  return updated;
}

export function saveAssessment(progress: UserProgress, scores: EQScores): UserProgress {
  let updated: UserProgress = {
    ...progress,
    assessmentScores: scores,
  };

  updated = updateStreak(updated);
  updated = checkBadges(updated);
  saveProgress(updated);
  return updated;
}

function checkBadges(progress: UserProgress): UserProgress {
  const earned = [...progress.badges];
  const earnedIds = new Set(earned.map(b => b.id));
  const today = new Date().toISOString().split('T')[0];

  // First assessment
  if (progress.assessmentScores && !earnedIds.has('first-assessment')) {
    earned.push({ ...allBadges.find(b => b.id === 'first-assessment')!, earnedDate: today });
  }

  // First exercise
  if (progress.completedExercises.length >= 1 && !earnedIds.has('first-exercise')) {
    earned.push({ ...allBadges.find(b => b.id === 'first-exercise')!, earnedDate: today });
  }

  // Five exercises
  if (progress.completedExercises.length >= 5 && !earnedIds.has('five-exercises')) {
    earned.push({ ...allBadges.find(b => b.id === 'five-exercises')!, earnedDate: today });
  }

  // Streak 3
  if (progress.dailyStreak >= 3 && !earnedIds.has('streak-3')) {
    earned.push({ ...allBadges.find(b => b.id === 'streak-3')!, earnedDate: today });
  }

  // Streak 7
  if (progress.dailyStreak >= 7 && !earnedIds.has('streak-7')) {
    earned.push({ ...allBadges.find(b => b.id === 'streak-7')!, earnedDate: today });
  }

  return { ...progress, badges: earned };
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
