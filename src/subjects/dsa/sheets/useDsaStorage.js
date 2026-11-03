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

export function useDsaStorage() {
  const [completedMap, setCompletedMap] = useState(() => readStoredMap());

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

  const resetAll = useCallback(() => {
    writeStoredMap({});
    setCompletedMap({});
    window.dispatchEvent(new CustomEvent('dsa-storage-change', { detail: {} }));
  }, []);

  return {
    completedMap,
    toggleCompleted,
    resetAll,
  };
}

