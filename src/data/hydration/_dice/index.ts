import { DiceModel, Model } from '@domain/models';
import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class DiceHydrator {
  public static hydrate(dto: DiceModel.DTO): DiceModel {
    const dice: DiceModel = Object.assign<Model, Omit<DiceModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        sides: dto.sides,
        value: dto.value,
        position: dto.position ? Vector.fromJSON(dto.position) : null,
        ownerID: dto.ownerID,
      },
    );

    return dice;
  }
}
