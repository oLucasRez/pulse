import { TableGenerator } from '@data/protocols';

import {
  makeCentralPulsesTableGeneratorDecorator,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeCentralPulsesTableGenerator(): TableGenerator {
  return [
    // inner
    makeCentralPulsesTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
