import { Model, PlayerModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IPlayerDAO {
  getAll(): Promise<PlayerModel.DTO[]>;
  getUnbanned(): Promise<PlayerModel.DTO[]>;
  getByID(id: string): Promise<PlayerModel.DTO | null>;
  getByUID(uid: string): Promise<PlayerModel.DTO | null>;
  getByOrder(order: number): Promise<PlayerModel.DTO | null>;
  create(payload: IPlayerDAO.CreatePayload): Promise<PlayerModel.DTO>;
  update(
    id: string,
    payload: IPlayerDAO.UpdatePayload,
  ): Promise<PlayerModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: PlayerModel.DTO[]) => void): Promise<() => void>;
}

export namespace IPlayerDAO {
  type BaseDTO = Omit<PlayerModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
