import { DeepPartial } from '@domain/types';

import { PulseDAO } from '..';

export interface SubjectPulseDAO {
  create(payload: SubjectPulseDAO.CreatePayload): Promise<SubjectPulseDAO.DTO>;
  read(): Promise<SubjectPulseDAO.DTO[]>;
  read(id: string): Promise<SubjectPulseDAO.DTO | null>;
  update(
    id: string,
    payload: SubjectPulseDAO.UpdatePayload,
  ): Promise<SubjectPulseDAO.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: SubjectPulseDAO.DTO[]) => void): Promise<() => void>;
}

export namespace SubjectPulseDAO {
  type BaseDTO = PulseDAO.BaseDTO;

  export type DTO = PulseDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
