import { makeGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { CentralPulsesTableGeneratorDecorator } from '@main/decorators';

export function makeCentralPulsesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CentralPulsesTableGeneratorDecorator({
    getCurrentGame,
    decorated,
  });
}
