import { CentralFactModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface ICentralFactDAO {
  getByID(id: string): Promise<CentralFactModel.DTO | null>;
  create(payload: ICentralFactDAO.CreatePayload): Promise<CentralFactModel.DTO>;
  update(
    id: string,
    payload: ICentralFactDAO.UpdatePayload,
  ): Promise<CentralFactModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: CentralFactModel.DTO[]) => void): Promise<() => void>;
}

export namespace ICentralFactDAO {
  type BaseDTO = Omit<CentralFactModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
