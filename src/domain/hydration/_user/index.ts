import { Model, UserModel } from '@domain/models';

import { GameCollection, UserCollection } from '@domain/collections';

import { ModelHydrator } from '..';

export class UserHydrator {
  public static hydrate(json: UserModel.JSON): UserModel {
    const user: UserModel = Object.assign<Model, Omit<UserModel, keyof Model>>(
      ModelHydrator.hydrate(json),
      {
        uid: json.uid,
        name: json.name,
        currentGame: json.currentGameID
          ? GameCollection.get(json.currentGameID)
          : null,
        isAnonymous: json.isAnonymous,
        providers: json.providers,
      },
    );

    const collection = UserCollection.getCollection();

    if (collection[json.uid]) Object.assign(collection[json.uid], user);
    else collection[json.uid] = user;

    return user;
  }
}
