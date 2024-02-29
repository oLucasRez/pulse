import { TableGenerator } from '@data/protocols';

import {
  makeDicesTableGeneratorDecorator,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeDicesTableGenerator(): TableGenerator {
  return [
    // inner
    makeDicesTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
