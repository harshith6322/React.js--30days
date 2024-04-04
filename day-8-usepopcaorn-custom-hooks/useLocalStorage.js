import { useState, useEffect } from "react";

export function useLocalStorage(initialstate, key) {
  const [value, setvalue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return []; //early return
    return JSON.parse(storedValue);
  });
  useEffect(() => {
    localStorage.setItem("MovisList", JSON.stringify(value));
  }, [value, key]);
  return [value, setvalue];
}
