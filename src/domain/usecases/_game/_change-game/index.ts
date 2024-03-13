import { GameModel } from '@domain/models';

export interface ChangeGameUsecase {
  execute(payload: ChangeGameUsecase.Payload): Promise<GameModel>;
}

export namespace ChangeGameUsecase {
  export type Payload = {
    title?: string;
    config?: {
      maxPlayers?: number;
      withLightSpot?: boolean;
      dicesMode?: GameModel.DicesMode;
    };
  };
}
