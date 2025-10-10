import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import EuropeCarousel from './EuropeCarousel';
import I18nProvider from '../i18n/context';

describe('EuropeCarousel component', () => {
  beforeEach(() => {
    localStorage.setItem('lang', 'fr');
  });

  it('renders the first city card', () => {
    render(
      <I18nProvider>
        <EuropeCarousel />
      </I18nProvider>
    );
    // Target the visible heading rather than the sr-only live region
    const cityHeading = screen.getByRole('heading', { name: /Paris \(France\)/ });
    expect(cityHeading).toBeInTheDocument();
  });
});