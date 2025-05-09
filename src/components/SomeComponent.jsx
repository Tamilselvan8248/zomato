import React, { useState, useEffect } from 'react';
import { 
  setLocalStorage, getLocalStorage, removeLocalStorage, 
  setSessionStorage, getSessionStorage, removeSessionStorage, 
  setCookie, getCookie, removeCookie, 
  setCacheStorage, getCacheStorage, removeCacheStorage 
} from '../utils/storage';

function SomeComponent() {
  const [localData, setLocalData] = useState('');
  const [sessionData, setSessionData] = useState('');
  const [cookieData, setCookieData] = useState('');
  const [cacheData, setCacheData] = useState('');

  useEffect(() => {
    setLocalData(getLocalStorage('localKey'));
    setSessionData(getSessionStorage('sessionKey'));
    setCookieData(getCookie('cookieKey'));
    getCacheStorage('myCache', 'cacheKey').then(setCacheData);
  }, []);

  const saveData = () => {
    const data = { user: 'John Doe', id: 123 };
    
    setLocalStorage('localKey', data);
    setSessionStorage('sessionKey', data);
    setCookie('cookieKey', data, { expires: 7 });
    setCacheStorage('myCache', 'cacheKey', data);
  };

  const clearData = () => {
    removeLocalStorage('localKey');
    removeSessionStorage('sessionKey');
    removeCookie('cookieKey');
    removeCacheStorage('myCache', 'cacheKey');
  };

  return (
    <div>
      <h1>Storage Example</h1>
      <div>
        <button onClick={saveData}>Save Data</button>
        <button onClick={clearData}>Clear Data</button>
      </div>
      <div>
        <p><strong>Local Storage Data:</strong> {JSON.stringify(localData)}</p>
        <p><strong>Session Storage Data:</strong> {JSON.stringify(sessionData)}</p>
        <p><strong>Cookie Data:</strong> {JSON.stringify(cookieData)}</p>
        <p><strong>Cache Data:</strong> {JSON.stringify(cacheData)}</p>
      </div>
    </div>
  );
}

export default SomeComponent;
