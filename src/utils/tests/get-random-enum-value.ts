import { faker } from '@faker-js/faker';

export function getRandomEnumValue<EnumType extends Record<string, any>>(
  enumType: EnumType,
): EnumType[keyof EnumType] {
  const statusValues = Object.values(enumType);
  const randomIndex = faker.number.int(statusValues.length - 1);

  return statusValues[randomIndex];
}
