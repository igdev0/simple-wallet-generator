import { jest } from '@jest/globals';
export {persistStore, persistReducer} from "redux-persist"

export const persistor = {
  persist: jest.fn(),
  purge: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
};

// --- THIS IS THE KEY CHANGE ---
// Create an in-memory Map to act as our mock storage
const inMemoryStorage = new Map<string, string>();

export const storage = {
  // getItem should retrieve from the Map
  getItem: jest.fn((key: string) => {
    return Promise.resolve(inMemoryStorage.get(key) || null); // Return null if not found
  }),
  // setItem should store in the Map
  setItem: jest.fn((key: string, value: string) => {
    inMemoryStorage.set(key, value);
    return Promise.resolve();
  }),
  // removeItem should delete from the Map
  removeItem: jest.fn((key: string) => {
    inMemoryStorage.delete(key);
    return Promise.resolve();
  }),
  // Add a helper to clear the in-memory storage for test isolation
  _clear: () => {
    inMemoryStorage.clear();
  },
  // Add a helper to get the raw Map for inspection in tests if needed
  _getMap: () => inMemoryStorage,
};