import { makeGetMeUsecase } from '@main/factories/usecases';

import { TableGenerator } from '@data/protocols';

import { RoundsTableGeneratorDecorator } from '@main/decorators';

export function makeRoundsTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new RoundsTableGeneratorDecorator({ getMe, decorated });
}
