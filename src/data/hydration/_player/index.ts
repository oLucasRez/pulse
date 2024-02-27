import { Model, PlayerModel } from '@domain/models';

import {
  DiceCollection,
  PlayerCollection,
  SubjectCollection,
} from '@data/collections';

import { ModelHydrator } from '..';

export class PlayerHydrator {
  public static async hydrate(json: PlayerModel.JSON): Promise<PlayerModel> {
    const player: PlayerModel = Object.assign<
      Model,
      Omit<PlayerModel, keyof Model>
    >(ModelHydrator.hydrate(json), {
      name: json.name,
      color: json.color,
      avatar: json.avatar,
      uid: json.uid,
      dice: json.diceID ? await DiceCollection.get(json.diceID) : null,
      subject: json.subjectID ? SubjectCollection.get(json.subjectID) : null,
      banned: json.banned,
    });

    PlayerCollection.append(json.id, player);

    return player;
  }
}
