import { DeepPartial } from '@domain/types';

import { ModelDAO } from '..';

export interface RoundDAO {
  create(payload: RoundDAO.CreatePayload): Promise<RoundDAO.DTO>;
  read(): Promise<RoundDAO.DTO[]>;
  read(id: string): Promise<RoundDAO.DTO | null>;
  update(id: string, payload: RoundDAO.UpdatePayload): Promise<RoundDAO.DTO>;
  delete(id: string): Promise<void>;
}

export namespace RoundDAO {
  type BaseDTO = {
    playerIDs: string[];
    currentPlayerID: string | null;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
