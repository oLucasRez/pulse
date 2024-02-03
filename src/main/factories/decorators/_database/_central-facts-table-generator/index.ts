import { makeGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { CentralFactsTableGeneratorDecorator } from '@main/decorators';

export function makeCentralFactsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CentralFactsTableGeneratorDecorator({ getCurrentGame, decorated });
}
