import { useState, useCallback } from 'react';
import type { Page, EQScores } from './lib/types';
import { exercises } from './lib/data';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ResultsPage } from './pages/ResultsPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { ExerciseDetailPage } from './pages/ExerciseDetailPage';
import { ProgressPage } from './pages/ProgressPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const { progress, completeExercise, saveAssessment, setAgeGroup } = useProgress();

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAssessmentComplete = useCallback((scores: EQScores) => {
    saveAssessment(scores);
  }, [saveAssessment]);

  const selectedExercise = selectedExerciseId
    ? exercises.find(e => e.id === selectedExerciseId)
    : null;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} onSelectAge={setAgeGroup} />;
      case 'assessment':
        return <AssessmentPage onNavigate={navigate} onComplete={handleAssessmentComplete} />;
      case 'results':
        return progress.assessmentScores
          ? <ResultsPage scores={progress.assessmentScores} onNavigate={navigate} />
          : <AssessmentPage onNavigate={navigate} onComplete={handleAssessmentComplete} />;
      case 'exercises':
        return (
          <ExercisesPage
            onNavigate={navigate}
            completedExercises={progress.completedExercises}
            onSelectExercise={setSelectedExerciseId}
          />
        );
      case 'exercise-detail':
        return selectedExercise ? (
          <ExerciseDetailPage
            exercise={selectedExercise}
            isCompleted={progress.completedExercises.includes(selectedExercise.id)}
            onNavigate={navigate}
            onComplete={completeExercise}
          />
        ) : (
          <ExercisesPage
            onNavigate={navigate}
            completedExercises={progress.completedExercises}
            onSelectExercise={setSelectedExerciseId}
          />
        );
      case 'progress':
        return <ProgressPage progress={progress} onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} onSelectAge={setAgeGroup} />;
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
    </>
  );
}

export default App;
