import { DeepPartial, Provider } from '@domain/types';

import { ModelDAO } from '..';

export interface UserDAO {
  create(payload: UserDAO.CreatePayload): Promise<UserDAO.DTO>;
  read(): Promise<UserDAO.DTO[]>;
  read(uid: string): Promise<UserDAO.DTO | null>;
  update(uid: string, payload: UserDAO.UpdatePayload): Promise<UserDAO.DTO>;
  delete(uid: string): Promise<void>;
}

export namespace UserDAO {
  type BaseDTO = {
    uid: string;
    name: string | null;
    currentGameID: string | null;
    isAnonymous: boolean;
    providers: Provider[];
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
