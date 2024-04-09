import { Provider } from '@domain/types';

import { GameModel, Model } from '..';

export interface UserModel extends Model {
  uid: string;
  name: string | null;
  currentGameID: GameModel['id'] | null;
  isAnonymous: boolean;
  providers: Provider[];
}

export namespace UserModel {
  export interface DTO extends Model.DTO {
    uid: string;
    name: string | null;
    currentGameID: string | null;
    isAnonymous: boolean;
    providers: Provider[];
  }
}
