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

export * from './_change-central-pulse';
export * from './_create-central-pulse';
export * from './_get-central-pulse';
export * from './_watch-central-pulse';
