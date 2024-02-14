import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

export interface CreatePlayerUsecase {
  execute(payload: CreatePlayerUsecase.Payload): Promise<PlayerModel>;
}

export namespace CreatePlayerUsecase {
  export type Payload = {
    name: string;
    color: Color;
    avatar: string;
  };
}
