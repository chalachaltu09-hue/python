/**
 * Local Storage wrapper
 */
class Storage {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  /**
   * Get item from storage
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return defaultValue;
    }
  }

  /**
   * Set item in storage
   */
  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  }

  /**
   * Remove item from storage
   */
  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  }

  /**
   * Clear all items with prefix
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Check if item exists
   */
  has(key) {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  /**
   * Get all items
   */
  getAll() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        const value = this.get(key.replace(this.prefix, ''));
        items[key.replace(this.prefix, '')] = value;
      }
    }
    return items;
  }

  /**
   * Get size of storage
   */
  get size() {
    return Object.keys(this.getAll()).length;
  }

  /**
   * Get storage usage
   */
  get usage() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      total += (key.length + value.length) * 2; // Approximate size in bytes
    }
    return total;
  }

  /**
   * Check if storage is available
   */
  static isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// Create instances for different purposes
export const authStorage = new Storage('auth_');
export const userStorage = new Storage('user_');
export const appStorage = new Storage('app_');
export const cacheStorage = new Storage('cache_');

// Session storage wrapper
class SessionStorage {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  get(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from session storage:', error);
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to session storage:', error);
      return false;
    }
  }

  remove(key) {
    try {
      sessionStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error('Error removing from session storage:', error);
      return false;
    }
  }

  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing session storage:', error);
      return false;
    }
  }
}

export const sessionStorage2 = new SessionStorage('session_');