import { PlayerModel } from '@domain/models';

export interface IWatchPlayersUsecase {
  execute(
    callback: IWatchPlayersUsecase.Callback,
  ): Promise<IWatchPlayersUsecase.Response>;
}

export namespace IWatchPlayersUsecase {
  export type Callback = (players: PlayerModel[]) => void;
  export type Response = () => void;
}
