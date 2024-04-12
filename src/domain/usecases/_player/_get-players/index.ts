import { PlayerModel } from '@domain/models';

export interface IGetPlayersUsecase {
  execute(options?: IGetPlayersUsecase.Options): Promise<PlayerModel[]>;
}

export namespace IGetPlayersUsecase {
  export type Options = {
    includeBanned?: boolean;
  };
}
