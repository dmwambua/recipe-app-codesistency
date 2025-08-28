import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  // Update debounced value after delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
