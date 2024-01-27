export function isNonNullable<V>(value: V): value is NonNullable<V> {
  return ![undefined, null].includes(value as any);
}
