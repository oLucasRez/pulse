import { TableGenerator } from '@data/protocols';

import { PlayersTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makePlayersTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new PlayersTableGeneratorDecorator({ getCurrentGame, decorated });
}
