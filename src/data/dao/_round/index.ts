import { Model, RoundModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IRoundDAO {
  getAll(): Promise<RoundModel.DTO[]>;
  getByID(id: string): Promise<RoundModel.DTO | null>;
  create(payload: IRoundDAO.CreatePayload): Promise<RoundModel.DTO>;
  update(id: string, payload: IRoundDAO.UpdatePayload): Promise<RoundModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: RoundModel.DTO[]) => void): Promise<() => void>;
}

export namespace IRoundDAO {
  type BaseDTO = Omit<RoundModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
