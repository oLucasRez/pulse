import { DeepPartial } from '@domain/types';

import { ModelCRUD } from '..';

export interface RoundCRUD {
  create(payload: RoundCRUD.CreatePayload): Promise<RoundCRUD.DTO>;
  read(): Promise<RoundCRUD.DTO[]>;
  read(id: string): Promise<RoundCRUD.DTO | null>;
  update(id: string, payload: RoundCRUD.UpdatePayload): Promise<RoundCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace RoundCRUD {
  type BaseDTO = {
    playerIDs: string[];
    currentPlayerID: string | null;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
