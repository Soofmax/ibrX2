export function checkI18nConsistency(
  frDict: Record<string, string>,
  enDict: Record<string, string>
) {
  try {
    const frKeys = Object.keys(frDict);
    const enKeys = Object.keys(enDict);

    const frSet = new Set(frKeys);
    const enSet = new Set(enKeys);

    const missingInEn = frKeys.filter((k) => !enSet.has(k));
    const missingInFr = enKeys.filter((k) => !frSet.has(k));
    const extrasInEn = enKeys.filter((k) => !frSet.has(k));
    const extrasInFr = frKeys.filter((k) => !enSet.has(k));

    if (missingInEn.length || missingInFr.length || extrasInEn.length || extrasInFr.length) {
      // Grouped warnings for developer visibility
      console.warn(
        `[i18n] Inconsistencies detected:
 - missing in EN: ${missingInEn.length} ${missingInEn.length ? '(' + missingInEn.join(', ') + ')' : ''}
 - missing in FR: ${missingInFr.length} ${missingInFr.length ? '(' + missingInFr.join(', ') + ')' : ''}
 - extra in EN: ${extrasInEn.length} ${extrasInEn.length ? '(' + extrasInEn.join(', ') + ')' : ''}
 - extra in FR: ${extrasInFr.length} ${extrasInFr.length ? '(' + extrasInFr.join(', ') + ')' : ''}`
      );
    }
  } catch {
    // no-op
  }
}