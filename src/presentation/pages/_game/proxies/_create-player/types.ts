import { ReactElement } from 'react';

import { PlayerModel } from '@domain/models';

export interface CreatePlayerProxyProps {
  children: ReactElement;
}

export type MyPlayerContextValue = {
  myPlayer: PlayerModel;
};
