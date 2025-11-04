import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement IntersectionObserver by default; provide a minimal mock
if (!('IntersectionObserver' in globalThis)) {
  type IOCallback = IntersectionObserverCallback;
  type IOInit = IntersectionObserverInit;

  class MockIntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];
    constructor(_cb: IOCallback, _options?: IOInit) {}
    observe(_target: Element) {}
    unobserve(_target: Element) {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  }

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}
