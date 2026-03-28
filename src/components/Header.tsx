import type { Page } from '../lib/types';
import './Header.css';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner container">
        <button className="header__logo" onClick={() => onNavigate('home')}>
          <svg className="header__logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#EC4899"/>
              </linearGradient>
            </defs>
            <path d="M32 56 C32 56 8 40 8 24 C8 14 16 8 24 8 C28 8 31 10 32 13 C33 10 36 8 40 8 C48 8 56 14 56 24 C56 40 32 56 32 56Z" fill="url(#logo-g)"/>
            <path d="M24 28 C24 24 28 22 32 22 C36 22 40 24 40 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M26 32 C26 30 29 28 32 28 C35 28 38 30 38 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M32 22 L32 36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="28" cy="36" r="2" fill="white"/>
            <circle cx="36" cy="36" r="2" fill="white"/>
          </svg>
          <span className="header__logo-text">EmotionLab</span>
        </button>

        <nav className="header__nav">
          <button
            className={`header__nav-link ${currentPage === 'assessment' ? 'active' : ''}`}
            onClick={() => onNavigate('assessment')}
          >
            EQ Assessment
          </button>
          <button
            className={`header__nav-link ${currentPage === 'exercises' ? 'active' : ''}`}
            onClick={() => onNavigate('exercises')}
          >
            Exercises
          </button>
          <button
            className={`header__nav-link ${currentPage === 'progress' ? 'active' : ''}`}
            onClick={() => onNavigate('progress')}
          >
            Progress
          </button>
        </nav>
      </div>
    </header>
  );
}
