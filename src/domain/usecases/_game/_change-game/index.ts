import { GameModel } from '@domain/models';

export interface IChangeGameUsecase {
  execute(payload: IChangeGameUsecase.Payload): Promise<GameModel>;
}

export namespace IChangeGameUsecase {
  export type Payload = {
    title?: string;
    config?: {
      maxPlayers?: number;
      withLightSpot?: boolean;
      dicesMode?: GameModel.DicesMode;
    };
  };
}
