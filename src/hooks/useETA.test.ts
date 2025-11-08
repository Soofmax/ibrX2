import { describe, it, expect } from 'vitest';
import { computeETA } from './useETA';

describe('computeETA', () => {
  it('computes ETA and kmRemaining with simple linear path', () => {
    const pathRef = {
      current: {
        getTotalLength: () => 1000,
      } as any,
    };
    const segments = [{ pxLen: 100 }, { pxLen: 100 }];
    const stops = [
      { t: 0, modeToNext: 'road' as const },
      { t: 0.5, modeToNext: 'road' as const },
      { t: 1, modeToNext: 'road' as const },
    ];
    const res = computeETA(0.25, 0, segments, pathRef as any, 1000, 250, stops);
    expect(res).not.toBeNull();
    if (res) {
      expect(res.kmRemaining).toBeGreaterThan(0);
      expect(res.etaDate).toBeInstanceOf(Date);
      expect(typeof res.isFerry).toBe('boolean');
    }
  });
});