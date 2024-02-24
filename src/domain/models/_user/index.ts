import { Provider } from '@domain/types';

import { GameModel, Model } from '..';

export interface UserModel extends Model {
  uid: string;
  name: string | null;
  currentGame: GameModel | null;
  isAnonymous: boolean;
  providers: Provider[];
}

export namespace UserModel {
  export type JSON = Model.JSON & {
    uid: string;
    name: string | null;
    currentGameID: GameModel['id'] | null;
    isAnonymous: boolean;
    providers: Provider[];
  };
}
