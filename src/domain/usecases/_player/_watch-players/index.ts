import { PlayerModel } from '@domain/models';

export interface WatchPlayersUsecase {
  execute(
    callback: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response>;
}

export namespace WatchPlayersUsecase {
  export type Callback = (players: PlayerModel[]) => void;
  export type Response = () => void;
}
