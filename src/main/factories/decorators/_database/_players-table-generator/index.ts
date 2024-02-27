import { TableGenerator } from '@data/protocols';

import { PlayersTableGeneratorDecorator } from '@main/decorators';

import { makeGetMeUsecase } from '@main/factories';

export function makePlayersTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new PlayersTableGeneratorDecorator({ getMe, decorated });
}
