import { TableGenerator } from '@data/protocols';

import {
  makeGamesTableGeneratorDecorator,
  makeSubjectsTableGeneratorDecorator,
} from '@main/factories';

export function makeSubjectsTableGenerator(): TableGenerator {
  return [
    // inner
    makeSubjectsTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
