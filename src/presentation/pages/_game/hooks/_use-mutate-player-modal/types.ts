import { ReactElement } from 'react';

import { PlayerModel } from '@domain/models';

export type MutatePlayerModalHookReturn = {
  openMutatePlayerModal(player?: PlayerModel): void;
  renderMutatePlayerModal(): ReactElement;
};

export type MutatePlayerModalHookProps =
  | {
      unclosable?: boolean;
      open?: boolean;
      player?: PlayerModel;
      onSuccess?(player: PlayerModel): void;
    }
  | undefined;
