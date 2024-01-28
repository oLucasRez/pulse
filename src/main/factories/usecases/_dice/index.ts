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

export * from './_change-dice';
export * from './_create-dice';
export * from './_delete-dice';
export * from './_get-dice';
export * from './_get-dices';
export * from './_watch-dices';
