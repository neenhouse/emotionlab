import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  it('renders the landing page with hero title', () => {
    render(<App />);
    expect(screen.getByText(/The Superpower/)).toBeInTheDocument();
    expect(screen.getByText(/AI Can't Learn/)).toBeInTheDocument();
  });

  it('renders the navigation header with nav links', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(within(header).getByText('EmotionLab')).toBeInTheDocument();
    expect(within(header).getByText('EQ Assessment')).toBeInTheDocument();
    expect(within(header).getByText('Exercises')).toBeInTheDocument();
    expect(within(header).getByText('Progress')).toBeInTheDocument();
  });

  it('navigates to assessment page when clicking nav link', async () => {
    const user = userEvent.setup();
    render(<App />);
    const header = screen.getByRole('banner');
    await user.click(within(header).getByText('EQ Assessment'));
    expect(screen.getByText(/Question 1/)).toBeInTheDocument();
  });

  it('navigates to exercises page', async () => {
    const user = userEvent.setup();
    render(<App />);
    const header = screen.getByRole('banner');
    await user.click(within(header).getByText('Exercises'));
    expect(screen.getByText('Exercise Library')).toBeInTheDocument();
  });

  it('navigates to progress page', async () => {
    const user = userEvent.setup();
    render(<App />);
    const header = screen.getByRole('banner');
    await user.click(within(header).getByText('Progress'));
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });
});
