import { DiceModel, Model } from '@domain/models';

import { ModelHydrator } from '..';

export class DiceHydrator {
  public static hydrate(dto: DiceModel.DTO): DiceModel {
    const dice: DiceModel = Object.assign<Model, Omit<DiceModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        sides: dto.sides,
        value: dto.value,
        ownerID: dto.ownerID,
      },
    );

    return dice;
  }
}
