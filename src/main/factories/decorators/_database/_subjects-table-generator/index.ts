import { TableGenerator } from '@data/protocols';

import { SubjectsTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeSubjectsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new SubjectsTableGeneratorDecorator({ getCurrentGame, decorated });
}
