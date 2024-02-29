import { DeepPartial, Provider } from '@domain/types';

import { ModelCRUD } from '..';

export interface UserCRUD {
  create(payload: UserCRUD.CreatePayload): Promise<UserCRUD.DTO>;
  read(): Promise<UserCRUD.DTO[]>;
  read(uid: string): Promise<UserCRUD.DTO | null>;
  update(uid: string, payload: UserCRUD.UpdatePayload): Promise<UserCRUD.DTO>;
  delete(uid: string): Promise<void>;
}

export namespace UserCRUD {
  type BaseDTO = {
    uid: string;
    name: string | null;
    currentGameID: string | null;
    isAnonymous: boolean;
    providers: Provider[];
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
