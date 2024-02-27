import { TableGenerator } from '@data/protocols';

import { DicesTableGeneratorDecorator } from '@main/decorators';

import { makeGetMeUsecase } from '@main/factories';

export function makeDicesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new DicesTableGeneratorDecorator({ getMe, decorated });
}
