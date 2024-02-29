import { Model, UserModel } from '@domain/models';

import { GameCollection } from '@data/collections';

import { UserCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class UserHydrator {
  public static async hydrate(dto: UserCRUD.DTO): Promise<UserModel> {
    const user: UserModel = Object.assign<Model, Omit<UserModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        uid: dto.uid,
        name: dto.name,
        currentGame: dto.currentGameID
          ? await GameCollection.get(dto.currentGameID)
          : null,
        isAnonymous: dto.isAnonymous,
        providers: dto.providers,
      },
    );

    return user;
  }
}
