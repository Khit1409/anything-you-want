export function setSessionItem<T>(key: string, payload: T) {
  const value = JSON.stringify(payload);
  return sessionStorage.setItem(key, value);
}
export const removeSessionItem = (key: string) => {
  return sessionStorage.removeItem(key);
};

export function getSessionItem<T>(key: string): T | undefined {
  const item = sessionStorage.getItem(key);
  if (!item) return;
  const value: T = JSON.parse(item);
  return value;
}
