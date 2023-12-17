type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[]>(func: DebounceFunction<T>, delay: number): DebounceFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
