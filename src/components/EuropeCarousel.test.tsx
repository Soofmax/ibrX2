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
    expect(screen.getByText(/Paris \(France\)/)).toBeInTheDocument();
  });
});