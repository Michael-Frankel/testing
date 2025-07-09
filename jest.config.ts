import type { Config } from 'jest';

const config: Config = {
    rootDir: './',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',           // include all TS/TSX files
        '!**/*.d.ts',                  // exclude type declarations
        '!**/index.ts',                // (optional) exclude entry points
        '!**/node_modules/**',         // always exclude node_modules
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['text', 'lcov'],
}

export default config