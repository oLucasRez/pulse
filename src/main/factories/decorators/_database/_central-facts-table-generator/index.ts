import { makeGetMeUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { CentralFactsTableGeneratorDecorator } from '@main/decorators';

export function makeCentralFactsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new CentralFactsTableGeneratorDecorator({ getMe, decorated });
}
