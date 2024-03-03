import { PlayerModel } from '@domain/models';

export interface GetPlayersUsecase {
  execute(options?: GetPlayersUsecase.Options): Promise<PlayerModel[]>;
}

export namespace GetPlayersUsecase {
  export type Options = {
    includeBanned?: boolean;
  };
}
