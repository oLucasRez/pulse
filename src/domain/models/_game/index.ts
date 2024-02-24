import { Model, UserModel } from '..';

export interface GameModel extends Model {
  uid: UserModel['uid'];
  title: string | null;
  config: {
    maxPlayers: number;
    withLightspot: boolean;
    dicesMode: 'equal' | 'growing';
  };
  started: boolean;
}
