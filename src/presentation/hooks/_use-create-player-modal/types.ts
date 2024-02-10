import { ReactNode } from 'react';

import { PlayerModel } from '@domain/models';

export type CreatePlayerModalHookReturn = {
  openCreatePlayerModal(): void;
  renderCreatePlayerModal(): ReactNode;
};

export type CreatePlayerModalHookProps =
  | {
      unclosable?: boolean;
      open?: boolean;
      onSuccess?(player: PlayerModel): void;
    }
  | undefined;
