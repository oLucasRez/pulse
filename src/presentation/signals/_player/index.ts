import { computed, signal } from '@preact/signals-react';

import { PlayerModel } from '@domain/models';

import { PlayerSignals } from './types';

import { authSignals } from '..';

const players = signal<PlayerModel[]>([]);
const myPlayer = computed<PlayerModel | null>(
  () =>
    players.value.find((player) => player.uid === authSignals.me.value?.uid) ??
    null,
);
const currentPlayer = signal<PlayerModel | null>(null);

export const playerSignals: PlayerSignals = {
  players,
  myPlayer,
  currentPlayer,
};

export { PlayerSignals } from './types';
