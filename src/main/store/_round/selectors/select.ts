import { RootState } from '@main/store';

import { RoundState } from '../types';

export const selectRound = (state: RootState): RoundState => state.round;
