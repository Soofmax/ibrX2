import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vitest' {
  interface Assertion<T = unknownicMatchersContaining extends TestingLibraryMatchers<any, void> {}
}