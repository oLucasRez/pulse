export function mapEnum<T extends Record<string, any>, M>(
  enumType: T,
  callback: (value: T[keyof T], i: number, array: T[keyof T][]) => M,
): M[] {
  const enumValues = Object.values(enumType) as Array<T[keyof T]>;

  return enumValues.map((value, i, array) => callback(value, i, array));
}
