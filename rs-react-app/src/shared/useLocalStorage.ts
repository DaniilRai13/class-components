import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [key]);

  const setLocalStorageValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setLocalStorageValue] as const;
};

