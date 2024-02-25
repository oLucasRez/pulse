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

export * from './_change-subject';
export * from './_create-my-subject';
export * from './_create-subject';
export * from './_get-my-subject';
export * from './_get-subject';
export * from './_get-subjects';
export * from './_watch-subjects';
