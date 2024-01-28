import { makeMockGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { PlayersTableGeneratorDecorator } from '@main/decorators';

export function makePlayersTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeMockGetCurrentGameUsecase();

  return new PlayersTableGeneratorDecorator({ getCurrentGame, decorated });
}
