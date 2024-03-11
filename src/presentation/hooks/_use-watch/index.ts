import { useEffect } from 'react';

import { logError } from '@presentation/utils';

export function useWatch(callback: () => Promise<() => void>): void {
  useEffect(() => {
    const unsubscribe = callback().catch(logError);

    return () => {
      unsubscribe.then((_) => _);
    };
  }, []);
}
