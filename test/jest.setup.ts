import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

afterEach(() => {
    cleanup();
    jest.clearAllMocks()
});

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});