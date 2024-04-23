import { LightSpotModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface ILightSpotDAO {
  getAll(): Promise<LightSpotModel.DTO[]>;
  getByID(id: string): Promise<LightSpotModel.DTO | null>;
  create(payload: ILightSpotDAO.CreatePayload): Promise<LightSpotModel.DTO>;
  update(
    id: string,
    payload: ILightSpotDAO.UpdatePayload,
  ): Promise<LightSpotModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: LightSpotModel.DTO[]) => void): Promise<() => void>;
}

export namespace ILightSpotDAO {
  type BaseDTO = Omit<LightSpotModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
