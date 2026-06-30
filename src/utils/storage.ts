// Memory fallback cache in case localStorage is blocked in iframe/sandboxed environments
const memoryCache: Record<string, string> = {};

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access blocked, using memory cache fallback:", e);
      return memoryCache[key] || null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage writing blocked, using memory cache fallback:", e);
      memoryCache[key] = value;
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage deletion blocked, using memory cache fallback:", e);
      delete memoryCache[key];
    }
  }
};
