import { DeepPartial } from '@domain/types';

import { PulseDAO } from '..';

export interface CentralPulseDAO {
  create(payload: CentralPulseDAO.CreatePayload): Promise<CentralPulseDAO.DTO>;
  read(): Promise<CentralPulseDAO.DTO[]>;
  read(id: string): Promise<CentralPulseDAO.DTO | null>;
  update(
    id: string,
    payload: CentralPulseDAO.UpdatePayload,
  ): Promise<CentralPulseDAO.DTO>;
  delete(id: string): Promise<void>;
}

export namespace CentralPulseDAO {
  type BaseDTO = PulseDAO.BaseDTO;

  export type DTO = PulseDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
