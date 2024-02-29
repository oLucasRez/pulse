import { TableGenerator } from '@data/protocols';

import {
  makeCentralFactsTableGeneratorDecorator,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeCentralFactsTableGenerator(): TableGenerator {
  return [
    // inner
    makeCentralFactsTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
