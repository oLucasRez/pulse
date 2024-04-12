import { Color } from '@domain/enums';
import { PlayerModel } from '@domain/models';

export interface IChangePlayerUsecase {
  execute(payload: IChangePlayerUsecase.Payload): Promise<PlayerModel>;
}

export namespace IChangePlayerUsecase {
  export type Payload = {
    name?: string;
    color?: Color;
    avatar?: string;
  };
}
