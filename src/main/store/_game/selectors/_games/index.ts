import { createSelector } from '@reduxjs/toolkit';

import { selectGame } from '../select';

export const gamesSelector = createSelector(selectGame, (game) => game.games);
