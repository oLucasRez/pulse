import { UserModel } from '@domain/models';

export interface IUserHydrator {
  hydrate(dto: UserModel.DTO): Promise<UserModel>;
}
