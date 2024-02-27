import { TableGenerator } from '@data/protocols';

import { CentralPulsesTableGeneratorDecorator } from '@main/decorators';

import { makeGetMeUsecase } from '@main/factories';

export function makeCentralPulsesTableGeneratorDecorator(
  decorated?: TableGenerator,
): TableGenerator {
  const getMe = makeGetMeUsecase();

  return new CentralPulsesTableGeneratorDecorator({
    getMe,
    decorated,
  });
}
