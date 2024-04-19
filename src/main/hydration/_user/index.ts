import { UserModel } from '@domain/models';

import { IUserHydrator } from '@data/hydration';

export class UserHydrator implements IUserHydrator {
  public async hydrate(dto: UserModel.DTO): Promise<UserModel> {
    return {
      id: dto.id,
      uid: dto.uid,
      name: dto.name,
      currentGameID: dto.currentGameID,
      isAnonymous: dto.isAnonymous,
      providers: dto.providers,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
