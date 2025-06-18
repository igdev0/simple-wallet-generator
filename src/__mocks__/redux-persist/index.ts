import {jest} from '@jest/globals';

export const persistReducer = jest.fn((_: any, reducer) => reducer);
export const persistStore = jest.fn(() => ({
  persist: jest.fn(),
  purge: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
}));
export const storage = { // Mock storage as it's imported by wallet.ts
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};