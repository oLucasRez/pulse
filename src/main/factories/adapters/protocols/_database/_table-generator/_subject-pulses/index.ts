import { TableGenerator } from '@data/protocols';

import {
  makeGamesTableGeneratorDecorator,
  makeSubjectPulsesTableGeneratorDecorator,
} from '@main/factories';

export function makeSubjectPulsesTableGenerator(): TableGenerator {
  return [
    // inner
    makeSubjectPulsesTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
