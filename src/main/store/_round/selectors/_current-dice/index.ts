import { createSelector } from '@reduxjs/toolkit';

import { dicesSelector } from '@main/store';

import { currentPlayerSelector } from '../_current-player';

export const currentDiceSelector = createSelector(
  [currentPlayerSelector, dicesSelector],
  (player, dices) => dices.find((value) => value.id === player?.diceID) ?? null,
);
