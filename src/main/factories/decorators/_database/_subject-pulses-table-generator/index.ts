import { TableGenerator } from '@data/protocols';

import { SubjectPulsesTableGeneratorDecorator } from '@main/decorators';
import { makeGetCurrentGameUsecase } from '@main/factories';

export function makeSubjectPulsesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new SubjectPulsesTableGeneratorDecorator({
    getCurrentGame,
    decorated,
  });
}
