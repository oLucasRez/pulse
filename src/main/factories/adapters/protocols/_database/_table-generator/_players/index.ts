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
