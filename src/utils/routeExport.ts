// Lightweight exports for the route data (CSV/JSON).
// Note: GPX/KML require coordinates; once we enrich routeStops with lat/lon we can add them.

import { routeStops } from '../data/routeStops';

export function generateCSVRoute() {
  const header = ['continent', 'label', 'modeToNext'];
  const rows = routeStops.map((s) => [s.continent, s.label, s.modeToNext ?? 'road']);
  const csv = [header.join(','), ...rows.map((r) => r.map(escapeCSV).join(','))].join('\n');
  return csv;
}

export function generateJSONRoute(pretty = true) {
  return JSON.stringify(routeStops, null, pretty ? 2 : 0);
}

export function downloadText(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

function escapeCSV(value: unknown) {
  const s = String(value ?? '');
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
