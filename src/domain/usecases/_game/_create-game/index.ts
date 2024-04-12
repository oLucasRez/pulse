import { GameModel } from '@domain/models';

export interface ICreateGameUsecase {
  execute(payload: ICreateGameUsecase.Payload): Promise<GameModel>;
}

export namespace ICreateGameUsecase {
  export type Payload = {
    title?: string;
    config: {
      maxPlayers: number;
      withLightSpot: boolean;
      dicesMode: 'equal' | 'growing';
    };
  };
}
