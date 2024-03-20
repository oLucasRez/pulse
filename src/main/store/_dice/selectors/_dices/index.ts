import { createSelector } from '@reduxjs/toolkit';

import { selectDice } from '../select';

export const dicesSelector = createSelector(selectDice, (dice) => dice.dices);
