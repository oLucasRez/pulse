import { TableGenerator } from '@data/protocols';

import { makeUsersTableGeneratorDecorator } from '@main/factories';

export function makeUsersTableGenerator(): TableGenerator {
  return makeUsersTableGeneratorDecorator();
}

export * from './_change-user';
export * from './_get-me';
export * from './_sign-up-with-password';
export * from './_watch-me';
