import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'dsa_completed_problems';

function readStoredMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Could not read from localStorage:', err);
    return {};
  }
}

function writeStoredMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn('Could not write to localStorage:', err);
  }
}

export function encodeSyncPayload(map) {
  try {
    const keys = Object.keys(map).filter((k) => Boolean(map[k]));
    return btoa(encodeURIComponent(JSON.stringify(keys)));
  } catch {
    return '';
  }
}

export function decodeSyncPayload(payload) {
  try {
    const jsonStr = decodeURIComponent(atob(payload));
    const keys = JSON.parse(jsonStr);
    if (!Array.isArray(keys)) return null;
    const map = {};
    for (const k of keys) {
      if (typeof k === 'string' && k.length > 0) {
        map[k] = true;
      }
    }
    return map;
  } catch {
    return null;
  }
}

export function useDsaStorage() {
  const [completedMap, setCompletedMap] = useState(() => readStoredMap());
  const [syncNotice, setSyncNotice] = useState(null);

  // Check URL hash for #sync= payload on mount or hash change
  useEffect(() => {
    const processHashSync = () => {
      const hash = window.location.hash || '';
      if (!hash.startsWith('#sync=')) return;
      const payload = hash.slice(6);
      const imported = decodeSyncPayload(payload);
      if (imported) {
        const count = Object.keys(imported).length;
        setCompletedMap((prev) => {
          const next = { ...prev, ...imported };
          writeStoredMap(next);
          window.dispatchEvent(new CustomEvent('dsa-storage-change', { detail: next }));
          return next;
        });
        setSyncNotice(`Synced ${count} completed problems!`);
        // Remove hash from URL cleanly without reloading
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, '', cleanUrl);
        setTimeout(() => setSyncNotice(null), 4500);
      }
    };

    processHashSync();
    window.addEventListener('hashchange', processHashSync);
    return () => window.removeEventListener('hashchange', processHashSync);
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      setCompletedMap(readStoredMap());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('dsa-storage-change', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('dsa-storage-change', handleUpdate);
    };
  }, []);

  const toggleCompleted = useCallback((problemId) => {
    setCompletedMap((prev) => {
      const next = { ...prev };
      if (next[problemId]) {
        delete next[problemId];
      } else {
        next[problemId] = true;
      }
      writeStoredMap(next);
      window.dispatchEvent(new CustomEvent('dsa-storage-change', { detail: next }));
      return next;
    });
  }, []);

  const importMap = useCallback((incomingMap) => {
    const validCount = Object.keys(incomingMap).filter((k) => Boolean(incomingMap[k])).length;
    setCompletedMap((prev) => {
      const next = { ...prev, ...incomingMap };
      writeStoredMap(next);
      window.dispatchEvent(new CustomEvent('dsa-storage-change', { detail: next }));
      return next;
    });
    setSyncNotice(`Successfully imported ${validCount} completed problems!`);
    setTimeout(() => setSyncNotice(null), 4000);
  }, []);

  const resetAll = useCallback(() => {
    writeStoredMap({});
    setCompletedMap({});
    window.dispatchEvent(new CustomEvent('dsa-storage-change', { detail: {} }));
  }, []);

  return {
    completedMap,
    toggleCompleted,
    importMap,
    resetAll,
    syncNotice,
  };
}
