//useDebounce allows for a pause for you to type before the search begins, otherwise, searching will start after every letter is typed
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
