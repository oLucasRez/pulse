import { TableGenerator } from '@data/protocols';

import { CentralPulsesTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeCentralPulsesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CentralPulsesTableGeneratorDecorator({
    getCurrentGame,
    decorated,
  });
}
