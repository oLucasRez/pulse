import { TableGenerator } from '@data/protocols';

import {
  makeGamesTableGeneratorDecorator,
  makePlayersTableGeneratorDecorator,
} from '@main/factories';

export function makePlayersTableGenerator(): TableGenerator {
  return [
    // inner
    makePlayersTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}

export * from './_change-player';
export * from './_create-player';
export * from './_delete-player';
export * from './_get-my-player';
export * from './_get-player';
export * from './_get-players';
export * from './_watch-players';
