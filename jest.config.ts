/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import type {Config} from 'jest';
import {createDefaultPreset} from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ...tsJestTransformCfg
  }
};

export default config;