import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { Usecase } from '@domain/usecases';

export type CreatePlayerUsecase = Usecase<
  PlayerModel,
  CreatePlayerUsecase.Payload
>;

export namespace CreatePlayerUsecase {
  export type Payload = {
    name: string;
    color: Color;
    gameID: string;
    diceID: string;
  };
}
