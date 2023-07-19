export function unique<ValueType>(
  array: ValueType[],
  isEqual: (a: ValueType, b: ValueType) => boolean = (
    a: ValueType,
    b: ValueType,
  ): boolean => a === b,
  replaceWith: (a: ValueType, b: ValueType) => ValueType = (
    a: ValueType,
  ): ValueType => a,
): ValueType[] {
  const result: ValueType[] = [];

  for (let i = 0; i < array.length; i++) {
    let foundDuplicate = false;

    for (let j = 0; j < result.length; j++) {
      if (isEqual(array[i], result[j])) {
        const replacedValue = replaceWith(array[i], result[j]);
        foundDuplicate = true;

        if (!result.some((value) => isEqual(value, replacedValue)))
          result[j] = replacedValue;

        break;
      }
    }

    if (!foundDuplicate) {
      result.push(array[i]);
    }
  }

  return result;
}
