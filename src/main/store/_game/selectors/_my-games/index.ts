import { createSelector } from '@reduxjs/toolkit';

import { selectAuth } from '@main/store';

import { selectGame } from '../select';

export const myGamesSelector = createSelector(
  [selectAuth, selectGame],
  (auth, game) => game.games.filter((value) => value.uid === auth.me?.uid),
);
