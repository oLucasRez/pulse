export function removeItem<V>(array: V[], item: V): number;
export function removeItem<V>(
  array: V[],
  predicate: (value: V) => boolean,
): number;
export function removeItem<V>(
  array: V[],
  value: V | ((value: V) => boolean),
): number {
  if (!array.length) return -1;

  const i =
    typeof value === 'function' && typeof array[0] !== 'function'
      ? array.findIndex(value as any)
      : array.indexOf(value as V);

  if (i === -1) return i;

  array.splice(i, 1);

  return i;
}
