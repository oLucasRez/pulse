import { RootState } from '@main/store';

import { DiceState } from '../types';

export const selectDice = (state: RootState): DiceState => state.dice;
