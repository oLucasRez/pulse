import { TableGenerator } from '@data/protocols';

import { QuestionsTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeQuestionsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new QuestionsTableGeneratorDecorator({ getCurrentGame, decorated });
}
