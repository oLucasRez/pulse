import { createSelector } from '@reduxjs/toolkit';

import { currentGameSelector } from '@main/store';

import { selectRound } from '../select';

export const roundSelector = createSelector(
  [currentGameSelector, selectRound],
  (currentGame, round) =>
    (currentGame?.roundID &&
      round.rounds.find((value) => value.id === currentGame.roundID)) ||
    null,
);
