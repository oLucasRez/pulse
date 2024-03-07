import { computed, signal } from '@preact/signals-react';

import { GameModel } from '@domain/models';

import { GameSignals } from './types';

import { authSignals } from '..';

const games = signal<GameModel[]>([]);
const currentGame = computed<GameModel | null>(
  () =>
    games.value.find(
      (game) => game.id === authSignals.me.value?.currentGameID,
    ) ?? null,
);

export const gameSignals: GameSignals = {
  games,
  currentGame,
};

export { GameSignals } from './types';
