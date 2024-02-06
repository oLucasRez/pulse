import { enumToArray } from '..';

export function mapEnum<E extends Record<string, any>, R>(
  enumType: E,
  callback: (value: E[keyof E]) => R,
): R[] {
  return enumToArray(enumType).map((value) => callback(value));
}
