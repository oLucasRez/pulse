import { TableGenerator } from '@data/protocols';

import { CentralFactsTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeCentralFactsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CentralFactsTableGeneratorDecorator({ getCurrentGame, decorated });
}
