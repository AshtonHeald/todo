import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
      const savedValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
      return savedValue;
  });

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

//const [lorem, setLorem] = useLocalStorage("lorem", []);
//const [ipsum, setIpsum] = useLocalStorage("ipsum", []);