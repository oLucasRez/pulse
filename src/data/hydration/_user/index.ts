import { Model, UserModel } from '@domain/models';

import { GameCollection } from '@data/collections';

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

    return user;
  }
}
