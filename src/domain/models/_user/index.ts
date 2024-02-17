import { Provider } from '@domain/types';

import { GameModel, Model } from '..';

export interface UserModel extends Model {
  uid: string;
  name: string;
  currentGameID: GameModel['id'] | null;
  isAnonymous: boolean;
  providers: Provider[];
}
