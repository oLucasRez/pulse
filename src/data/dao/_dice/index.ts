import { DiceModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IDiceDAO {
  getAll(): Promise<DiceModel.DTO[]>;
  getByID(id: string): Promise<DiceModel.DTO | null>;
  create(payload: IDiceDAO.CreatePayload): Promise<DiceModel.DTO>;
  update(id: string, payload: IDiceDAO.UpdatePayload): Promise<DiceModel.DTO>;
  delete(id: string): Promise<void>;
  watch(
    callback: (dtos: DiceModel.DTO[]) => Promise<void> | void,
  ): Promise<() => void>;
}

export namespace IDiceDAO {
  type BaseDTO = Omit<DiceModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
