import { ReactNode } from 'react';

import { PlayerModel } from '@domain/models';

export type MutatePlayerModalHookReturn = {
  openMutatePlayerModal(player?: PlayerModel): void;
  renderMutatePlayerModal(): ReactNode;
};

export type MutatePlayerModalHookProps =
  | {
      unclosable?: boolean;
      open?: boolean;
      player?: PlayerModel;
      onSuccess?(player: PlayerModel): void;
    }
  | undefined;
