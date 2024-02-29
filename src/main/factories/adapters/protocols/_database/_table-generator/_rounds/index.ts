import { TableGenerator } from '@data/protocols';

import {
  makeGamesTableGeneratorDecorator,
  makeRoundsTableGeneratorDecorator,
} from '@main/factories';

export function makeRoundsTableGenerator(): TableGenerator {
  return [
    // inner
    makeRoundsTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
