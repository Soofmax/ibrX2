import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement IntersectionObserver by default; provide a minimal mock
if (!('IntersectionObserver' in globalThis)) {
  class MockIntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];
    constructor(..._args: unknown[]) {
      // mark as used to satisfy lint rules
      void _args;
    }
    observe(_target: Element) {
      void _target;
    }
    unobserve(_target: Element) {
      void _target;
    }
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});
}
