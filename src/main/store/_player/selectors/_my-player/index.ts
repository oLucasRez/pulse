import { createSelector } from '@reduxjs/toolkit';

import { selectAuth } from '@main/store';

import { selectPlayer } from '../select';

export const myPlayerSelector = createSelector(
  [selectAuth, selectPlayer],
  (auth, player) =>
    player.players.find((player) => player.uid === auth.me?.uid) ?? null,
);
