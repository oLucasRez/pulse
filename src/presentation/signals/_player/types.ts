import { Signal } from '@preact/signals-react';

import { PlayerModel } from '@domain/models';

export type PlayerSignals = {
  players: Signal<PlayerModel[]>;
  myPlayer: Signal<PlayerModel | null>;
  currentPlayer: Signal<PlayerModel | null>;
};
