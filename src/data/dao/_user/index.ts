import { Model, UserModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IUserDAO {
  getByUID(uid: string): Promise<UserModel.DTO | null>;
  create(payload: IUserDAO.CreatePayload): Promise<UserModel.DTO>;
  update(uid: string, payload: IUserDAO.UpdatePayload): Promise<UserModel.DTO>;
  delete(uid: string): Promise<void>;
}

export namespace IUserDAO {
  type BaseDTO = Omit<UserModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
