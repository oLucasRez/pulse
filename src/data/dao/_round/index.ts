import { RoundModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

import { ModelDAO } from '..';

export interface RoundDAO {
  create(payload: RoundDAO.CreatePayload): Promise<RoundDAO.DTO>;
  read(): Promise<RoundDAO.DTO[]>;
  read(id: string): Promise<RoundDAO.DTO | null>;
  update(id: string, payload: RoundDAO.UpdatePayload): Promise<RoundDAO.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: RoundDAO.DTO[]) => void): Promise<() => void>;
}

export namespace RoundDAO {
  type BaseDTO = {
    playerIDs: string[];
    i: number | null;
    clockwise: RoundModel.Clockwise | null;
    started: boolean;
    finished: boolean;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
