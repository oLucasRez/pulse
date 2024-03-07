import { Signal } from '@preact/signals-react';

import { GameModel } from '@domain/models';

export type GameSignals = {
  games: Signal<GameModel[]>;
  currentGame: Signal<GameModel | null>;
};
