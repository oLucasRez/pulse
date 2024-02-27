import { GameModel } from '@domain/models';

import { ModelCRUD } from '..';

export interface GameCRUD {
  create(payload: GameCRUD.CreatePayload): Promise<GameCRUD.DTO>;
  read(): Promise<GameCRUD.DTO[]>;
  read(id: string): Promise<GameCRUD.DTO | null>;
  update(id: string, payload: GameCRUD.UpdatePayload): Promise<GameCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace GameCRUD {
  export type DTO = ModelCRUD.DTO & {
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

  export type CreatePayload = {
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

  export type UpdatePayload = {
    uid?: string;
    title?: string | null;
    config?: {
      maxPlayers?: number;
      withLightspot?: boolean;
      dicesMode?: GameModel.DicesMode;
    };
    started?: boolean;
    state?: GameModel.State;
    roundID?: string | null;
    lightspotRoundID?: string | null;
  };
}
