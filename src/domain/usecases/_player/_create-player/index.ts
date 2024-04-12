import { Color } from '@domain/enums';
import { PlayerModel } from '@domain/models';

export interface ICreatePlayerUsecase {
  execute(payload: ICreatePlayerUsecase.Payload): Promise<PlayerModel>;
}

export namespace ICreatePlayerUsecase {
  export type Payload = {
    name: string;
    color: Color;
    avatar: string;
  };
}
