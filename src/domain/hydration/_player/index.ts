import { Model, PlayerModel } from '@domain/models';

import {
  PlayerCollection,
  SubjectCollection,
  UserCollection,
} from '@domain/collections';

import { ModelHydrator } from '..';

export class PlayerHydrator {
  public static hydrate(json: PlayerModel.JSON): PlayerModel {
    const player: PlayerModel = Object.assign<
      Model,
      Omit<PlayerModel, keyof Model>
    >(ModelHydrator.hydrate(json), {
      name: json.name,
      color: json.color,
      avatar: json.avatar,
      user: UserCollection.get(json.uid),
      subject: json.subjectID ? SubjectCollection.get(json.subjectID) : null,
      banned: json.banned,
    });

    const collection = PlayerCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], player);
    else collection[json.id] = player;

    return player;
  }
}
