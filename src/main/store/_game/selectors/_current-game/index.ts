import { createSelector } from '@reduxjs/toolkit';

import { selectAuth } from '@main/store';

import { selectGame } from '../select';

export const currentGameSelector = createSelector(
  [selectAuth, selectGame],
  (auth, game) =>
    game.games.find((game) => game.id === auth.me?.currentGameID) ?? null,
);
