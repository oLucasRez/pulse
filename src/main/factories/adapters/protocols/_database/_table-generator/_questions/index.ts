import { TableGenerator } from '@data/protocols';

import {
  makeGamesTableGeneratorDecorator,
  makeQuestionsTableGeneratorDecorator,
} from '@main/factories';

export function makeQuestionsTableGenerator(): TableGenerator {
  return [
    // inner
    makeQuestionsTableGeneratorDecorator,
    makeGamesTableGeneratorDecorator,
    // outer
  ].reduce(
    (decorated, makeTableGenerator) => makeTableGenerator(decorated),
    undefined as unknown as TableGenerator,
  );
}
