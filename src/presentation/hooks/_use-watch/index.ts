import { DependencyList, useEffect } from 'react';

import { logError } from '@presentation/utils';

export function useWatch(
  callback: () => Promise<(() => void) | undefined>,
  deps: DependencyList,
): void {
  useEffect(() => {
    const unsubscribe: Promise<(() => void) | undefined> =
      callback().catch(logError);

    return () => {
      unsubscribe.then((_) => _?.());
    };
  }, deps);
}
