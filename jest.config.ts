/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import type {Config} from 'jest';
import {createDefaultPreset} from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/identity-obj-proxy.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: "tsconfig.jest.json"
    }
  },
  verbose: true,
  transform: {
    ...tsJestTransformCfg
  }
};

export default config;