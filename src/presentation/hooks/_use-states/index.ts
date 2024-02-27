import { Dispatch, useCallback, useMemo, useState } from 'react';

import { SetCallback, Value } from './types';

export function useStates<S extends object>(initial: S): [S, SetCallback<S>] {
  const states = Object.entries(initial).reduce((obj, [key, value]) => {
    obj[key as keyof S] = useState(value);

    return obj;
  }, {} as Record<keyof S, [any, Dispatch<any>]>);

  const proxy = useMemo(
    () =>
      new Proxy(initial, {
        set(obj, prop, value): boolean {
          const _prop = prop as keyof S;

          obj[_prop] = value;

          const [, setState] = states[_prop];
          setState(value);

          return true;
        },
      }),
    [],
  );

  const set = useCallback(
    <K extends keyof S>(
      ...args: [key: K, value?: Value<S, K>]
    ): ((value?: Value<S, K>) => void) => {
      if (args.length === 1) {
        const [key] = args;

        return (...args) => {
          if (args.length !== 1) throw new Error('Argument is not setted');

          if (typeof args[0] === 'function')
            proxy[key] = (args[0] as (prev: S[K]) => S[K])(proxy[key]);
          else proxy[key] = args[0] as S[K];
        };
      }

      const [key, value] = args;

      return () => {
        if (typeof value === 'function')
          proxy[key] = (value as (prev: S[K]) => S[K])(proxy[key]);
        else proxy[key] = value as S[K];
      };
    },
    [proxy],
  );

  return [proxy, set];
}
