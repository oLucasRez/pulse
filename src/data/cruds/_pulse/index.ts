import { DeepPartial } from '@domain/types';

import { Vector } from '@domain/utils';

import { ModelCRUD } from '..';

export interface PulseCRUD {
  create(payload: PulseCRUD.CreatePayload): Promise<PulseCRUD.DTO>;
  read(): Promise<PulseCRUD.DTO[]>;
  read(id: string): Promise<PulseCRUD.DTO | null>;
  update(id: string, payload: PulseCRUD.UpdatePayload): Promise<PulseCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace PulseCRUD {
  export type BaseDTO = {
    origin: Vector.JSON;
    gap: number;
    amount: number;
    landmarkID: string;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}

export * from './_central-pulse';
