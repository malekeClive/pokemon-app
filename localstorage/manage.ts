type StorageValue = string | number | boolean | object | null;

const localStorageUtils = {
  // Set an item in local storage
  setItem: <T extends StorageValue>(key: string, value: T): boolean => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error("Error setting item in local storage:", error);
      return false;
    }
  },

  // Get an item from local storage
  getItem: <T extends StorageValue>(key: string): T | null => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error("Error getting item from local storage:", error);
      return null;
    }
  },

  // Remove an item from local storage
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing item from local storage:", error);
      return false;
    }
  },

  // Clear all items from local storage
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing local storage:", error);
      return false;
    }
  },

  // Append an item to an array in local storage
  appendToArray: <T>(key: string, item: T): boolean => {
    try {
      const existingArray = localStorageUtils.getItem<T[]>(key) || [];
      existingArray.push(item);
      return localStorageUtils.setItem(key, existingArray);
    } catch (error) {
      console.error("Error appending to array in local storage:", error);
      return false;
    }
  },

  // Remove a specific item from an array in local storage
  removeFromArray: <T>(
    key: string,
    predicate: (item: T) => boolean
  ): boolean => {
    try {
      const existingArray = localStorageUtils.getItem<T[]>(key) || [];
      const updatedArray = existingArray.filter((item) => !predicate(item));

      if (existingArray.length === updatedArray.length) {
        return false; // No items were removed
      }

      return localStorageUtils.setItem(key, updatedArray);
    } catch (error) {
      console.error("Error removing item from array in local storage:", error);
      return false;
    }
  },

  findInArray: <T>(
    key: string,
    predicate: (item: T) => boolean
  ): T | undefined => {
    try {
      const existingArray = localStorageUtils.getItem<T[]>(key) || [];
      return existingArray.find(predicate);
    } catch (error) {
      console.error("Error finding item in array in local storage:", error);
      return undefined;
    }
  },
};

export default localStorageUtils;
