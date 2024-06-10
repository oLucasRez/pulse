import { ReactElement } from 'react';

import { PlayerModel } from '@domain/models';

export interface PlayerExistsProxyProps {
  children: ReactElement<PlayerExistsProxyChildrenProps>;
}

export interface PlayerExistsProxyChildrenProps {
  player?: PlayerModel | null;
}
