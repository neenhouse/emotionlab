export interface EQScores {
  empathy: number;
  selfAwareness: number;
  selfRegulation: number;
  socialSkills: number;
  motivation: number;
}

export interface AssessmentQuestion {
  id: number;
  scenario: string;
  ageGroup: AgeGroup;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  emoji: string;
  label: string;
  scores: Partial<EQScores>;
}

export type AgeGroup = '5-7' | '8-10' | '11-13' | '14-15';

export type ExerciseCategory = 'empathy' | 'self-regulation' | 'conflict-resolution' | 'social-skills';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: ExerciseCategory;
  ageGroups: AgeGroup[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scenario: string;
  reflectionPrompts: string[];
  icon: string;
}

export interface UserProgress {
  completedExercises: string[];
  assessmentScores: EQScores | null;
  dailyStreak: number;
  lastActiveDate: string;
  badges: Badge[];
  ageGroup: AgeGroup | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export type Page = 'home' | 'assessment' | 'results' | 'exercises' | 'exercise-detail' | 'progress';
