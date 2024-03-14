import { Color } from '@domain/enums';
import { DeepPartial } from '@domain/types';

import { ModelDAO } from '..';

export interface PlayerDAO {
  create(payload: PlayerDAO.CreatePayload): Promise<PlayerDAO.DTO>;
  read(): Promise<PlayerDAO.DTO[]>;
  read(id: string): Promise<PlayerDAO.DTO | null>;
  update(id: string, payload: PlayerDAO.UpdatePayload): Promise<PlayerDAO.DTO>;
  delete(id: string): Promise<void>;
}

export namespace PlayerDAO {
  type BaseDTO = {
    name: string;
    color: Color;
    avatar: string;
    uid: string;
    diceID: string | null;
    subjectID: string | null;
    banned: boolean;
    order: number;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
