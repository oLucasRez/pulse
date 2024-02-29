import { DeepPartial } from '@domain/types';

import { Vector } from '@domain/utils';

import { LandmarkCRUD } from '..';

export interface CentralFactCRUD {
  create(payload: CentralFactCRUD.CreatePayload): Promise<CentralFactCRUD.DTO>;
  read(): Promise<CentralFactCRUD.DTO[]>;
  read(id: string): Promise<CentralFactCRUD.DTO | null>;
  update(
    id: string,
    payload: CentralFactCRUD.UpdatePayload,
  ): Promise<CentralFactCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace CentralFactCRUD {
  type BaseDTO = LandmarkCRUD.BaseDTO & {
    position: Vector.JSON;
    description: string;
  };

  export type DTO = LandmarkCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
