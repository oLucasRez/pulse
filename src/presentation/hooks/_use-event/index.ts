import { useCallback } from 'react';

import { EventHookReturn } from './types';

import { useStates } from '..';

export function useEvent<
  F extends (...args: any) => any,
>(): EventHookReturn<F> {
  const [s] = useStates({ listeners: [] as F[] });

  const on = useCallback((callback: F) => {
    s.listeners = [...s.listeners, callback];

    return () => s.listeners.splice(s.listeners.indexOf(callback), 1);
  }, []);

  const notify = useCallback((...args: Parameters<F>) => {
    s.listeners.map((callback) => callback(...args));
  }, []);

  return { on, notify };
}
