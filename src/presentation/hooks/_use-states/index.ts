import { Dispatch, useMemo, useState } from 'react';

export function useStates<S extends object>(initial: S): S {
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

          return value;
        },
      }),
    [],
  );

  return proxy;
}
