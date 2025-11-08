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
    const toggle = await screen.findByTestId('toggle-play');
    expect(toggle).toBeInTheDocument();

    // Click to toggle to "Play"/"Lecture"
    fireEvent.click(toggle);
    const playBtns = await screen.findAllByRole('button', { name: /play|lecture/i });
    expect(playBtns[0]).toBeInTheDocument();
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
    const toggle = await screen.findByTestId('toggle-play');
    expect(toggle).toBeInTheDocument();

    // Space key should toggle to "Play"/"Lecture"
    fireEvent.keyDown(focusable as Element, { key: ' ' });
    const playBtns = await screen.findAllByRole('button', { name: /play|lecture/i });
    expect(playBtns[0]).toBeInTheDocument();
  });
});