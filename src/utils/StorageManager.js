// src/utils/StorageManager.js

export const StorageManager = {
  // Set data to LocalStorage
  setLocalStorage: (key, data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },

  // Get data from LocalStorage
  getLocalStorage: (key) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Set data to SessionStorage
  setSessionStorage: (key, data) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },

  // Get data from SessionStorage
  getSessionStorage: (key) => {
    if (typeof window !== 'undefined') {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Set data to Cookies
  setCookie: (key, data, expiresDays = 7) => {
    if (typeof window !== 'undefined') {
      const date = new Date();
      date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${key}=${JSON.stringify(data)};${expires};path=/`;
    }
  },

  // Get data from Cookies
  getCookie: (key) => {
    if (typeof window !== 'undefined') {
      const name = `${key}=`;
      const decodedCookies = decodeURIComponent(document.cookie);
      const ca = decodedCookies.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return null;
  },

  // Set data to Cache (IndexedDB or Cache API)
  setCache: async (key, data) => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      const cache = await caches.open('app-cache');
      cache.put(key, new Response(JSON.stringify(data)));
    }
  },

  // Get data from Cache
  getCache: async (key) => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      const cache = await caches.open('app-cache');
      const response = await cache.match(key);
      if (response) {
        const data = await response.json();
        return data;
      }
    }
    return null;
  },
};
