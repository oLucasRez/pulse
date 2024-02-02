import { makeMockGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { CentralPulsesTableGeneratorDecorator } from '@main/decorators';

export function makeCentralPulsesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeMockGetCurrentGameUsecase();

  return new CentralPulsesTableGeneratorDecorator({
    getCurrentGame,
    decorated,
  });
}
