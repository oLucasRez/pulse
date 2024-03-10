import { DeepPartial } from '@domain/types';
import { Vector } from '@domain/utils';

import { ModelDAO } from '..';

export interface DiceDAO {
  create(payload: DiceDAO.CreatePayload): Promise<DiceDAO.DTO>;
  read(): Promise<DiceDAO.DTO[]>;
  read(id: string): Promise<DiceDAO.DTO | null>;
  update(id: string, payload: DiceDAO.UpdatePayload): Promise<DiceDAO.DTO>;
  delete(id: string): Promise<void>;
}

export namespace DiceDAO {
  type BaseDTO = {
    sides: number;
    value: number | null;
    position: Vector.JSON | null;
    ownerID: string | null;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
