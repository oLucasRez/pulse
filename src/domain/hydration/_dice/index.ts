import { DiceModel } from '@domain/models';

import { DiceCollection, PlayerCollection } from '@domain/collections';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class DiceHydrator {
  public static hydrate(json: DiceModel.JSON): DiceModel {
    const playerCollection = PlayerCollection.getCollection();

    const dice: DiceModel = Object.assign(ModelHydrator.hydrate(json), {
      sides: json.sides,
      value: json.value,
      position: json.position ? Vector.fromJSON(json.position) : null,
      owner: json.ownerID ? playerCollection[json.ownerID] : null,
    });

    const collection = DiceCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], dice);
    else collection[json.id] = dice;

    return dice;
  }
}
