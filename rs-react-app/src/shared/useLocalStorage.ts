export const useLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)

  const setLocalStorageValue = (searchTerm: string, newValue: string) => {
    localStorage.setItem(searchTerm, newValue);
  };

  return { value, setLocalStorageValue }
};
