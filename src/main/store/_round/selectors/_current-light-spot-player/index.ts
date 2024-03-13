import { createSelector } from '@reduxjs/toolkit';

import { playersSelector } from '@main/store';

import { lightSpotRoundSelector } from '../_light-spot-round';

export const currentLightSpotPlayerSelector = createSelector(
  [lightSpotRoundSelector, playersSelector],
  (round, players) =>
    players.find(
      (value) => value.id === (round?.playerIDs ?? [])[round?.i ?? -1],
    ) ?? null,
);
