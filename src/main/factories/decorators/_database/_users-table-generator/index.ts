import { TableGenerator } from '@data/protocols';

import { UsersTableGeneratorDecorator } from '@main/decorators';

export function makeUsersTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  return new UsersTableGeneratorDecorator(decorated);
}
