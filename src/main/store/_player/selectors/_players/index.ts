import { createSelector } from '@reduxjs/toolkit';

import { selectPlayer } from '../select';

export const playersSelector = createSelector(selectPlayer, (player) =>
  player.players.filter((value) => !value.banned),
);
