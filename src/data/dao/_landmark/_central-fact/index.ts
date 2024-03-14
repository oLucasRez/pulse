import { DeepPartial } from '@domain/types';
import { Vector } from '@domain/utils';

import { LandmarkDAO } from '..';

export interface CentralFactDAO {
  create(payload: CentralFactDAO.CreatePayload): Promise<CentralFactDAO.DTO>;
  read(): Promise<CentralFactDAO.DTO[]>;
  read(id: string): Promise<CentralFactDAO.DTO | null>;
  update(
    id: string,
    payload: CentralFactDAO.UpdatePayload,
  ): Promise<CentralFactDAO.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: CentralFactDAO.DTO[]) => void): Promise<() => void>;
}

export namespace CentralFactDAO {
  type BaseDTO = LandmarkDAO.BaseDTO & {
    position: Vector.JSON;
    description: string;
  };

  export type DTO = LandmarkDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
