import { TableGenerator } from '@data/protocols';

import { RoundsTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeRoundsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new RoundsTableGeneratorDecorator({ getCurrentGame, decorated });
}
