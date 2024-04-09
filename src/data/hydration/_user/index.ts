import { Model, UserModel } from '@domain/models';

import { ModelHydrator } from '..';

export class UserHydrator {
  public static hydrate(dto: UserModel.DTO): UserModel {
    const user: UserModel = Object.assign<Model, Omit<UserModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        uid: dto.uid,
        name: dto.name,
        currentGameID: dto.currentGameID,
        isAnonymous: dto.isAnonymous,
        providers: dto.providers,
      },
    );

    return user;
  }
}
