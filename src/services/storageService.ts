export const storageService = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error(`storageService.get failed for key "${key}"`, error);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`storageService.set failed for key "${key}"`, error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};