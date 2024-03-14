import { GameModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

import { ModelDAO } from '..';

export interface GameDAO {
  create(payload: GameDAO.CreatePayload): Promise<GameDAO.DTO>;
  read(): Promise<GameDAO.DTO[]>;
  read(id: string): Promise<GameDAO.DTO | null>;
  update(id: string, payload: GameDAO.UpdatePayload): Promise<GameDAO.DTO>;
  delete(id: string): Promise<void>;
}

export namespace GameDAO {
  type BaseDTO = {
    uid: string;
    title: string | null;
    config: {
      maxPlayers: number;
      withLightSpot: boolean;
      dicesMode: GameModel.DicesMode;
    };
    state: GameModel.State;
    roundID: string | null;
    lightSpotRoundID: string | null;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
