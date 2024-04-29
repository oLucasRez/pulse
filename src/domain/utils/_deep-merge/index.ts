const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export function deepMerge(
  target: Record<any, any>,
  ...sources: Record<any, any>[]
): Record<any, any> {
  const merge = (
    target: Record<any, any>,
    source: Record<any, any>,
  ): Record<any, any> => {
    for (const key in source)
      if (isObject(target[key]) && isObject(source[key]))
        target[key] = deepMerge(target[key], source[key]);
      else target[key] = source[key];

    return target;
  };

  for (const source of sources) target = merge(target, source);

  return target;
}
