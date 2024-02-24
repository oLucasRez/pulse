import { Model, UserModel } from '..';

export interface GameModel extends Model {
  host: UserModel;
  title: string | null;
  config: {
    maxPlayers: number;
    withLightspot: boolean;
    dicesMode: 'equal' | 'growing';
  };
  started: boolean;
}

export namespace GameModel {
  export type JSON = Model.JSON & {
    uid: UserModel['uid'];
    title: string | null;
    config: {
      maxPlayers: number;
      withLightspot: boolean;
      dicesMode: 'equal' | 'growing';
    };
    started: boolean;
  };
}
