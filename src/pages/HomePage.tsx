import type { Page, AgeGroup } from '../lib/types';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectAge: (age: AgeGroup) => void;
}

const features = [
  {
    icon: '💗',
    title: 'Empathy Training',
    description: 'Learn to understand and share the feelings of others through guided scenarios and role-play exercises.',
    color: 'var(--pink)',
    bg: 'var(--pink-50)',
  },
  {
    icon: '🧘',
    title: 'Self-Regulation',
    description: 'Build a personal toolkit of strategies to manage big emotions and respond thoughtfully, not reactively.',
    color: 'var(--teal)',
    bg: 'var(--teal-50)',
  },
  {
    icon: '🕊️',
    title: 'Conflict Resolution',
    description: 'Walk through step-by-step processes to resolve disagreements peacefully and find solutions that work for everyone.',
    color: 'var(--amber)',
    bg: 'var(--amber-50)',
  },
  {
    icon: '🤝',
    title: 'Social Skills',
    description: 'Practice the art of building and maintaining healthy relationships through active listening and communication.',
    color: 'var(--violet)',
    bg: 'var(--violet-50)',
  },
];

const ageGroups: { value: AgeGroup; label: string; description: string }[] = [
  { value: '5-7', label: 'Ages 5-7', description: 'Foundation building' },
  { value: '8-10', label: 'Ages 8-10', description: 'Core development' },
  { value: '11-13', label: 'Ages 11-13', description: 'Advanced practice' },
  { value: '14-15', label: 'Ages 14-15', description: 'Leadership skills' },
];

const steps = [
  { num: '1', title: 'Take the Assessment', description: 'A fun, scenario-based quiz that maps your child\'s emotional intelligence across 5 dimensions.', icon: '🧭' },
  { num: '2', title: 'Get Your EQ Profile', description: 'See strengths and growth areas in a visual radar chart. Every child has unique emotional superpowers.', icon: '📊' },
  { num: '3', title: 'Practice Daily', description: 'Short, engaging exercises tailored to your child\'s age and needs. Just 10 minutes a day.', icon: '✨' },
  { num: '4', title: 'Watch Them Grow', description: 'Track progress with streaks, badges, and growth metrics. Celebrate every milestone together.', icon: '🌱' },
];

const testimonials = [
  {
    quote: "My daughter went from shutting down during disagreements to calmly expressing her feelings. The Peace Bridge exercise was a game-changer.",
    name: "Sarah M.",
    role: "Parent of 9-year-old",
  },
  {
    quote: "As a teacher, I've seen kids who use EmotionLab become the peacemakers in class. They help other kids resolve conflicts naturally.",
    name: "David R.",
    role: "4th Grade Teacher",
  },
  {
    quote: "My son actually asks to do his 'emotion exercises' now. He's more aware of how his actions affect others.",
    name: "Lisa K.",
    role: "Parent of 11-year-old",
  },
];

export function HomePage({ onNavigate, onSelectAge }: HomePageProps) {
  const handleAgeSelect = (age: AgeGroup) => {
    onSelectAge(age);
    onNavigate('assessment');
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            The most AI-proof skill set a child can develop
          </div>
          <h1 className="hero__title">
            The Superpower{' '}
            <span className="hero__title-gradient">AI Can't Learn</span>
          </h1>
          <p className="hero__subtitle">
            EmotionLab develops emotional intelligence in children ages 5-15 through
            interactive exercises in empathy, self-regulation, conflict resolution,
            and social awareness. Because the future belongs to humans who understand humans.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={() => onNavigate('assessment')}>
              Start EQ Assessment
              <span className="btn__arrow">&#8594;</span>
            </button>
            <button className="btn btn--secondary btn--lg" onClick={() => onNavigate('exercises')}>
              Browse Exercises
            </button>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">10</span>
              <span className="hero__stat-label">Scenario Questions</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">8</span>
              <span className="hero__stat-label">Interactive Exercises</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">5</span>
              <span className="hero__stat-label">EQ Dimensions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Building Emotional Superpowers</h2>
          <p className="section-subtitle">
            Four pillars of emotional intelligence, taught through interactive scenarios kids actually enjoy.
          </p>
          <div className="features__grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card" style={{ '--card-color': feature.color, '--card-bg': feature.bg } as React.CSSProperties}>
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="age-groups">
        <div className="container">
          <h2 className="section-title">Choose Your Path</h2>
          <p className="section-subtitle">
            Content and scenarios are tailored to each age group's developmental stage.
          </p>
          <div className="age-groups__grid">
            {ageGroups.map((group) => (
              <button
                key={group.value}
                className="age-card"
                onClick={() => handleAgeSelect(group.value)}
              >
                <span className="age-card__value">{group.label}</span>
                <span className="age-card__desc">{group.description}</span>
                <span className="age-card__arrow">&#8594;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            A simple four-step journey to stronger emotional intelligence.
          </p>
          <div className="steps__grid">
            {steps.map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-card__num">{step.icon}</div>
                <div className="step-card__content">
                  <div className="step-card__step">Step {step.num}</div>
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Parents & Teachers Say</h2>
          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">{'★'.repeat(5)}</div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta__card">
            <h2 className="cta__title">Ready to build your child's most important skill?</h2>
            <p className="cta__desc">
              Start with a free EQ assessment. It takes just 5 minutes and reveals powerful insights about your child's emotional strengths.
            </p>
            <button className="btn btn--primary btn--lg" onClick={() => onNavigate('assessment')}>
              Start Free Assessment
              <span className="btn__arrow">&#8594;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">EmotionLab</span>
            <p className="footer__tagline">The superpower AI can't learn.</p>
          </div>
          <div className="footer__links">
            <button onClick={() => onNavigate('assessment')}>Assessment</button>
            <button onClick={() => onNavigate('exercises')}>Exercises</button>
            <button onClick={() => onNavigate('progress')}>Progress</button>
          </div>
          <p className="footer__copy">&copy; 2026 EmotionLab. A human-first company for the AI era.</p>
        </div>
      </footer>
    </div>
  );
}
