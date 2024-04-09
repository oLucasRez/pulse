import { GameModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IGameDAO {
  getAll(): Promise<GameModel.DTO[]>;
  getByID(id: string): Promise<GameModel.DTO | null>;
  create(payload: IGameDAO.CreatePayload): Promise<GameModel.DTO>;
  update(id: string, payload: IGameDAO.UpdatePayload): Promise<GameModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: GameModel.DTO[]) => void): Promise<() => void>;
}

export namespace IGameDAO {
  type BaseDTO = Omit<GameModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
