import { createSelector } from '@reduxjs/toolkit';

import { dicesSelector } from '@main/store';

import { currentLightSpotPlayerSelector } from '../_current-light-spot-player';

export const currentLightSpotDiceSelector = createSelector(
  [currentLightSpotPlayerSelector, dicesSelector],
  (player, dices) => dices.find((value) => value.id === player?.diceID) ?? null,
);
