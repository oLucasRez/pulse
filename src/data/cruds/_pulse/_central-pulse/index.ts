import { DeepPartial } from '@domain/types';

import { PulseCRUD } from '..';

export interface CentralPulseCRUD {
  create(
    payload: CentralPulseCRUD.CreatePayload,
  ): Promise<CentralPulseCRUD.DTO>;
  read(): Promise<CentralPulseCRUD.DTO[]>;
  read(id: string): Promise<CentralPulseCRUD.DTO | null>;
  update(
    id: string,
    payload: CentralPulseCRUD.UpdatePayload,
  ): Promise<CentralPulseCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace CentralPulseCRUD {
  type BaseDTO = PulseCRUD.BaseDTO;

  export type DTO = PulseCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
