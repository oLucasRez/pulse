import { TableGenerator } from '@data/protocols';

import { makeGamesTableGeneratorDecorator } from '@main/factories';

export function makeGamesTableGenerator(): TableGenerator {
  return makeGamesTableGeneratorDecorator();
}
