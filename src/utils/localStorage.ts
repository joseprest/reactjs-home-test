export const getValue = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setValue = (key: string, data: any) => {
  return window.localStorage.setItem(key, data);
};
