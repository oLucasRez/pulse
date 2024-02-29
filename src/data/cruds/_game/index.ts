import { GameModel } from '@domain/models';

import { DeepPartial } from '@domain/types';

import { ModelCRUD } from '..';

export interface GameCRUD {
  create(payload: GameCRUD.CreatePayload): Promise<GameCRUD.DTO>;
  read(): Promise<GameCRUD.DTO[]>;
  read(id: string): Promise<GameCRUD.DTO | null>;
  update(id: string, payload: GameCRUD.UpdatePayload): Promise<GameCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace GameCRUD {
  type BaseDTO = {
    uid: string;
    title: string | null;
    config: {
      maxPlayers: number;
      withLightspot: boolean;
      dicesMode: GameModel.DicesMode;
    };
    started: boolean;
    state: GameModel.State;
    roundID: string | null;
    lightspotRoundID: string | null;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
