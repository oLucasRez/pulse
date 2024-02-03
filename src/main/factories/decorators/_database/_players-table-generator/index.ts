import { makeGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { PlayersTableGeneratorDecorator } from '@main/decorators';

export function makePlayersTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new PlayersTableGeneratorDecorator({ getCurrentGame, decorated });
}
