import { TableGenerator } from '@data/protocols';

import { makeUsersTableGeneratorDecorator } from '@main/factories';

export function makeUsersTableGenerator(): TableGenerator {
  return makeUsersTableGeneratorDecorator();
}

export * from './_change-me';
export * from './_get-me';
export * from './_link-with-provider';
export * from './_sign-in-anonymously';
export * from './_sign-in-with-credentials';
export * from './_sign-in-with-provider';
export * from './_sign-out';
export * from './_sign-up-with-credentials';
export * from './_watch-me';
