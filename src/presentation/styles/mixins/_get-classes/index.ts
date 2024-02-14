export function getClasses(classes: Record<string, any>): string {
  const array: string[] = [];

  Object.entries(classes).map(([key, value]) => value && array.push(key));

  return array.join(' ');
}
