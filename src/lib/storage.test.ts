import { describe, it, expect, beforeEach } from 'vitest';
import { getProgress, saveProgress, completeExercise, saveAssessment, resetProgress } from './storage';
import type { UserProgress, EQScores } from './types';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('returns default progress when nothing stored', () => {
    const progress = getProgress();
    expect(progress.completedExercises).toEqual([]);
    expect(progress.assessmentScores).toBeNull();
    expect(progress.dailyStreak).toBe(0);
    expect(progress.badges).toEqual([]);
  });

  it('saves and retrieves progress', () => {
    const progress: UserProgress = {
      completedExercises: ['empathy-mirror'],
      assessmentScores: null,
      dailyStreak: 1,
      lastActiveDate: '2026-03-27',
      badges: [],
      ageGroup: '8-10',
    };
    saveProgress(progress);
    const retrieved = getProgress();
    expect(retrieved.completedExercises).toEqual(['empathy-mirror']);
    expect(retrieved.ageGroup).toBe('8-10');
  });

  it('completes an exercise and updates streak', () => {
    const progress = getProgress();
    const updated = completeExercise(progress, 'empathy-mirror');
    expect(updated.completedExercises).toContain('empathy-mirror');
    expect(updated.dailyStreak).toBeGreaterThanOrEqual(1);
  });

  it('does not duplicate completed exercises', () => {
    let progress = getProgress();
    progress = completeExercise(progress, 'empathy-mirror');
    progress = completeExercise(progress, 'empathy-mirror');
    expect(progress.completedExercises.filter(e => e === 'empathy-mirror')).toHaveLength(1);
  });

  it('saves assessment scores and awards badge', () => {
    const scores: EQScores = {
      empathy: 2.5,
      selfAwareness: 1.8,
      selfRegulation: 2.0,
      socialSkills: 2.2,
      motivation: 1.5,
    };
    const progress = getProgress();
    const updated = saveAssessment(progress, scores);
    expect(updated.assessmentScores).toEqual(scores);
    expect(updated.badges.some(b => b.id === 'first-assessment')).toBe(true);
  });

  it('resets progress', () => {
    const scores: EQScores = {
      empathy: 2, selfAwareness: 2, selfRegulation: 2, socialSkills: 2, motivation: 2,
    };
    const progress = getProgress();
    saveAssessment(progress, scores);
    resetProgress();
    const fresh = getProgress();
    expect(fresh.assessmentScores).toBeNull();
    expect(fresh.completedExercises).toEqual([]);
  });
});
