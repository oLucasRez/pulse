import { makeGetCurrentGameUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { SubjectsTableGeneratorDecorator } from '@main/decorators';

export function makeSubjectsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new SubjectsTableGeneratorDecorator({ getCurrentGame, decorated });
}
