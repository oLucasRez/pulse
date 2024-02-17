import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

export interface ChangePlayerUsecase {
  execute(
    id: string,
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel>;
}

export namespace ChangePlayerUsecase {
  export type Payload = {
    name?: string;
    color?: Color;
    avatar?: string;
  };
}
