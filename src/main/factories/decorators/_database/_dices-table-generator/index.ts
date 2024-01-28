import { makeMockGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { DicesTableGeneratorDecorator } from '@main/decorators';

export function makeDicesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeMockGetCurrentGameUsecase();

  return new DicesTableGeneratorDecorator({ getCurrentGame, decorated });
}
