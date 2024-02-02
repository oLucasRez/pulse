import { TableGenerator } from '@data/protocols';

import { makeGamesTableGeneratorDecorator } from '@main/factories';

export function makeGamesTableGenerator(): TableGenerator {
  return makeGamesTableGeneratorDecorator();
}

export * from './_create-game';
export * from './_delete-game';
export * from './_get-current-game';
export * from './_get-game';
