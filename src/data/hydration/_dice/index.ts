import { DiceModel, Model } from '@domain/models';

import { DiceCollection, PlayerCollection } from '@data/collections';

import { DiceCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class DiceHydrator {
  public static async hydrate(dto: DiceCRUD.DTO): Promise<DiceModel> {
    const dice: DiceModel = Object.assign<Model, Omit<DiceModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        sides: dto.sides,
        value: dto.value,
        position: dto.position ? Vector.fromJSON(dto.position) : null,
        owner: dto.ownerID ? PlayerCollection.get(dto.ownerID) : null,
      },
    );

    DiceCollection.append(dto.id, dice);

    return dice;
  }
}
