import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import I18nProvider from '../i18n/context';
import { MemoryRouter } from 'react-router-dom';

describe('Hero component', () => {
  beforeEach(() => {
    // Force English to avoid environment variance
    localStorage.setItem('lang', 'en');
  });

  it('renders hero CTA buttons with i18n text', () => {
    render(
      <I18nProvider>
        <MemoryRouter>
          <Hero />
        </MemoryRouter>
      </I18nProvider>
    );
    expect(screen.getByText('Support the Adventure')).toBeInTheDocument();
    expect(screen.getByText('Discover the Itinerary')).toBeInTheDocument();
  });
});