import { CentralPulseModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface ICentralPulseDAO {
  getByID(id: string): Promise<CentralPulseModel.DTO | null>;
  create(
    payload: ICentralPulseDAO.CreatePayload,
  ): Promise<CentralPulseModel.DTO>;
  update(
    id: string,
    payload: ICentralPulseDAO.UpdatePayload,
  ): Promise<CentralPulseModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: CentralPulseModel.DTO[]) => void): Promise<() => void>;
}

export namespace ICentralPulseDAO {
  type BaseDTO = Omit<CentralPulseModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
