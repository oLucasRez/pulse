import { Color } from '@domain/enums';

import { DeepPartial } from '@domain/types';

import { ModelCRUD } from '..';

export interface PlayerCRUD {
  create(payload: PlayerCRUD.CreatePayload): Promise<PlayerCRUD.DTO>;
  read(): Promise<PlayerCRUD.DTO[]>;
  read(id: string): Promise<PlayerCRUD.DTO | null>;
  update(
    id: string,
    payload: PlayerCRUD.UpdatePayload,
  ): Promise<PlayerCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace PlayerCRUD {
  type BaseDTO = {
    name: string;
    color: Color;
    avatar: string;
    uid: string;
    diceID: string | null;
    subjectID: string | null;
    banned: boolean;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
