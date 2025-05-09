// src/utils/storage.js

// LocalStorage utility functions
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// SessionStorage utility functions
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

// Cookie utility functions
import Cookies from 'js-cookie';

export const setCookie = (key, value, options = {}) => {
  Cookies.set(key, JSON.stringify(value), options);
};

export const getCookie = (key) => {
  const value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

// Cache Storage utility functions (for use with Service Worker)
export const setCacheStorage = (cacheName, key, value) => {
  if ('caches' in window) {
    caches.open(cacheName).then((cache) => {
      cache.put(key, new Response(JSON.stringify(value)));
    });
  }
};

export const getCacheStorage = (cacheName, key) => {
  if ('caches' in window) {
    return caches
      .open(cacheName)
      .then((cache) => cache.match(key))
      .then((response) => response && response.json());
  }
  return Promise.resolve(null);
};

export const removeCacheStorage = (cacheName, key) => {
  if ('caches' in window) {
    caches.open(cacheName).then((cache) => {
      cache.delete(key);
    });
  }
};
