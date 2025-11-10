import { useMemo } from 'react';

export type SegmentInfo = { pxLen: number };
export type UseETAArgs = {
  progress: number;
  currentStopIndex: number;
  segments: SegmentInfo[];
  pathRef: React.MutableRefObject<SVGPathElement | null>;
  expeditionKm: number;
  averageKmPerDay: number;
  // Optional helpers
  stops?: { t: number; modeToNext?: 'road' | 'ferry' }[];
};

export type ETAInfo = {
  kmRemaining: number;
  etaDate: Date;
  isFerry: boolean;
} | null;

/**
 * Calcule une ETA (date d'arrivée estimée) simple en fonction de la progression
 * le long d'un tracé SVG.
 *
 * Hypothèses:
 * - La distance en kilomètres de l'expédition (expeditionKm) est répartie
 *   proportionnellement à la longueur totale du chemin SVG.
 * - La vitesse moyenne quotidienne (averageKmPerDay) est constante.
 * - Les segments sont échantillonnés en pixels et fournissent leur longueur
 *   (pxLen) pour un calcul local du reste à parcourir.
 *
 * Retourne null si les données minimales ne sont pas disponibles.
 */
export function computeETA(
  progress: number,
  currentStopIndex: number,
  segments: SegmentInfo[],
  pathRef: { current: { getTotalLength(): number } | null },
  expeditionKm: number,
  averageKmPerDay: number,
  stops?: { t: number; modeToNext?: 'road' | 'ferry' }[]
): ETAInfo {
  if (!pathRef.current || segments.length === 0 || !stops || stops.length === 0) return null;

  const currIdx = Math.min(currentStopIndex, segments.length - 1);
  const currStop = stops[currIdx];
  const next = stops[currIdx + 1] ?? stops[currIdx]; // fallback
  const seg = segments[currIdx];

  const path = pathRef.current;
  const length = path.getTotalLength();
  const Lcurr = currStop.t * length;
  const Lnext = next.t * length;
  const Lnow = progress * length;

  const segSpan = Math.max(1, Lnext - Lcurr);
  const localT = Math.min(1, Math.max(0, (Lnow - Lcurr) / segSpan));

  const pxRemaining = seg.pxLen * (1 - localT);
  const scaleKmPerPx = length > 0 ? expeditionKm / length : 0; // approximation
  const kmRemaining = pxRemaining * scaleKmPerPx;

  const travelDays = kmRemaining / Math.max(1, averageKmPerDay);
  const etaMs = travelDays * 24 * 60 * 60 * 1000;
  const etaDate = new Date(Date.now() + etaMs);

  return { kmRemaining, etaDate, isFerry: currStop.modeToNext === 'ferry' };
}

/**
 * Hook qui mémoïse le calcul de l'ETA pour éviter les recomputations inutiles.
 */
export function useETA(args: UseETAArgs & { stops: { t: number; modeToNext?: 'road' | 'ferry' }[] }): ETAInfo {
  const { progress, currentStopIndex, segments, pathRef, expeditionKm, averageKmPerDay, stops } = args;

  return useMemo(
    () =>
      computeETA(progress, currentStopIndex, segments, pathRef, expeditionKm, averageKmPerDay, stops),
    [progress, currentStopIndex, segments, pathRef, expeditionKm, averageKmPerDay, stops]
  );
}