import { DependencyList, useEffect } from 'react';

import { IntervalHookOptions } from './types';

export function useInterval(
  callback: () => void,
  ms: number,
  deps: DependencyList = [],
  options: IntervalHookOptions = {},
): void {
  const { firstShot } = options;

  useEffect(() => {
    if (firstShot) callback();

    const interval = setInterval(() => callback(), ms);

    return () => clearInterval(interval);
  }, deps);
}
