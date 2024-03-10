import { TableGenerator } from '@data/protocols';

import { DicesTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeDicesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DicesTableGeneratorDecorator({ getCurrentGame, decorated });
}
