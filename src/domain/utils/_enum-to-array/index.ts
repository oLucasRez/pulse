export function enumToArray<E extends Record<string, any>>(
  enumType: E,
): E[keyof E][] {
  return Object.values(enumType);
}
