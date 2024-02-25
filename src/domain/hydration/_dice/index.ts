import { DiceModel, Model } from '@domain/models';

import { DiceCollection, PlayerCollection } from '@domain/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class DiceHydrator {
  public static hydrate(json: DiceModel.JSON): DiceModel {
    const dice: DiceModel = Object.assign<Model, Omit<DiceModel, keyof Model>>(
      ModelHydrator.hydrate(json),
      {
        sides: json.sides,
        value: json.value,
        position: json.position ? Vector.fromJSON(json.position) : null,
        owner: json.ownerID ? PlayerCollection.get(json.ownerID) : null,
      },
    );

    const collection = DiceCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], dice);
    else collection[json.id] = dice;

    return dice;
  }
}
