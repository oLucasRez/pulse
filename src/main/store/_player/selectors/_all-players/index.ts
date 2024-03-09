import { createSelector } from '@reduxjs/toolkit';

import { selectPlayer } from '../select';

export const allPlayersSelector = createSelector(
  selectPlayer,
  (player) => player.players,
);
