import { TableGenerator } from '@data/protocols';

import { GamesTableGeneratorDecorator } from '@main/decorators';

export function makeGamesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  return new GamesTableGeneratorDecorator(decorated);
}
