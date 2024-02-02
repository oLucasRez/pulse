import { makeMockGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { CentralFactsTableGeneratorDecorator } from '@main/decorators';

export function makeCentralFactsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeMockGetCurrentGameUsecase();

  return new CentralFactsTableGeneratorDecorator({ getCurrentGame, decorated });
}
