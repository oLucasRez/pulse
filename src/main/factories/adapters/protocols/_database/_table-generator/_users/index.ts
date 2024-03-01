import { TableGenerator } from '@data/protocols';

import { makeUsersTableGeneratorDecorator } from '@main/factories';

export function makeUsersTableGenerator(): TableGenerator {
  return makeUsersTableGeneratorDecorator();
}