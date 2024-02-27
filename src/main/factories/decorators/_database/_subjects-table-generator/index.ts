import { TableGenerator } from '@data/protocols';

import { SubjectsTableGeneratorDecorator } from '@main/decorators';

import { makeGetMeUsecase } from '@main/factories';

export function makeSubjectsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new SubjectsTableGeneratorDecorator({ getMe, decorated });
}
