import { PlayerModel } from '@domain/models';

import {
  PlayerCollection,
  SubjectCollection,
  UserCollection,
} from '@domain/collections';

import { ModelHydrator } from '..';

export class PlayerHydrator {
  public static hydrate(json: PlayerModel.JSON): PlayerModel {
    const userCollection = UserCollection.getCollection();
    const subjectCollection = SubjectCollection.getCollection();

    const player: PlayerModel = Object.assign(ModelHydrator.hydrate(json), {
      name: json.name,
      color: json.color,
      avatar: json.avatar,
      user: userCollection[json.uid],
      subject: json.subjectID ? subjectCollection[json.subjectID] : null,
      banned: json.banned,
    });

    const collection = PlayerCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], player);
    else collection[json.id] = player;

    return player;
  }
}
