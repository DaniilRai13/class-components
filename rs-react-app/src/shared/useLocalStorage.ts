export const localStorageHelper = {
  getFromLocalStorage: (name: string) => localStorage.getItem(name),
  setToLocalStorage: (name: string, content: string) =>
    localStorage.setItem(name, content),
};
