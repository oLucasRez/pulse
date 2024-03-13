import { createSelector } from '@reduxjs/toolkit';

import { currentGameSelector } from '@main/store';

import { selectRound } from '../select';

export const lightSpotRoundSelector = createSelector(
  [currentGameSelector, selectRound],
  (currentGame, round) =>
    (currentGame?.lightSpotRoundID &&
      round.rounds.find(
        (value) => value.id === currentGame.lightSpotRoundID,
      )) ||
    null,
);
