import { describe, it, expect } from 'vitest';
import { generateCSVRoute, generateJSONRoute } from './routeExport';
import { routeStops } from '../data/routeStops';

describe('routeExport', () => {
  it('generates CSV with header and rows', () => {
    const csv = generateCSVRoute();
    const lines = csv.split('\n');
    expect(lines[0]).toBe('continent,label,modeToNext');
    expect(lines.length).toBeGreaterThan(1);
  });

  it('generates JSON matching routeStops', () => {
    const json = generateJSONRoute();
    const parsed = JSON.parse(json);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(routeStops.length);
    expect(parsed[0]).toHaveProperty('label');
    expect(parsed[0]).toHaveProperty('continent');
  });
});