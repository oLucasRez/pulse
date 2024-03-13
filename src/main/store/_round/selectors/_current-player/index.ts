import { createSelector } from '@reduxjs/toolkit';

import { playersSelector } from '@main/store';

import { roundSelector } from '../_round';

export const currentPlayerSelector = createSelector(
  [roundSelector, playersSelector],
  (round, players) =>
    players.find(
      (value) => value.id === (round?.playerIDs ?? [])[round?.i ?? -1],
    ) ?? null,
);
