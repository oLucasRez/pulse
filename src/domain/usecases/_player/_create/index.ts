import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { Usecase } from '@domain/usecases';

export type CreatePlayerUsecase = Usecase<
  CreatePlayerUsecase.Payload,
  CreatePlayerUsecase.Response
>;

export namespace CreatePlayerUsecase {
  export type Payload = {
    name: string;
    color: Color;
    gameID: string;
    diceID: string;
  };

  export type Response = PlayerModel;
}
