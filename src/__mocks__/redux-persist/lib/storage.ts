const mockedStorage = new Map<string, any>();
const storage = {
  getItem: (key: string) => mockedStorage.get(key),
  setItem: (key: string, value: string) => mockedStorage.set(key, value),
  removeItem: (key: string) => mockedStorage.delete(key),
};

export default storage;