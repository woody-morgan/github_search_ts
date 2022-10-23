import { throttle } from 'lodash-es';
import { useCallback, useEffect } from 'react';

export default function useWindowResize(callback: () => void, delay: number) {
  const handleResize = useCallback(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    const throttled = throttle(handleResize, delay);
    window.addEventListener('resize', throttled);
    handleResize();
    return () => window.removeEventListener('resize', throttled);
  }, [handleResize, delay]);
}
