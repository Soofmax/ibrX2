import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrentLocation from './CurrentLocation';
import I18nProvider from '../i18n/context';

describe('CurrentLocation component', () => {
  it('renders the map SVG with accessible label', () => {
    render(
      <I18nProvider>
        <CurrentLocation />
      </I18nProvider>
    );
    const svg = screen.getByRole('img', { name: /carte de l’itinéraire|route map/i });
    expect(svg).toBeInTheDocument();
  });

  it('toggles play/pause via control button', async () => {
    render(
      <I18nProvider>
        <CurrentLocation />
      </I18nProvider>
    );
    const toggles = await screen.findAllByTestId('toggle-play');
    const toggle = toggles[0];
    expect(toggle).toBeInTheDocument();

    // Click to toggle to "Play"/"Lecture"
    fireEvent.click(toggle);
    const togglesAfter = await screen.findAllByTestId('toggle-play');
    expect(togglesAfter[0]).toHaveTextContent(/play|lecture/i);
  });

  it('responds to keyboard Space on the animation container', async () => {
    const { container } = render(
      <I18nProvider>
        <CurrentLocation />
      </I18nProvider>
    );

    // Find the focusable animation container (tabIndex=0)
    const focusable = container.querySelector('div[tabindex="0"]');
    expect(focusable).toBeTruthy();

    // Initially, the pause button is present (playing = true)
    const toggles = await screen.findAllByTestId('toggle-play');
    const toggle = toggles[0];
    expect(toggle).toBeInTheDocument();

    // Space key should toggle to "Play"/"Lecture"
    fireEvent.keyDown(focusable as Element, { key: ' ' });
    const togglesAfter = await screen.findAllByTestId('toggle-play');
    expect(togglesAfter[0]).toHaveTextContent(/play|lecture/i);
  });
});