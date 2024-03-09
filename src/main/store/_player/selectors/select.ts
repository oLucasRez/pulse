import { RootState } from '@main/store';

import { PlayerState } from '../types';

export const selectPlayer = (state: RootState): PlayerState => state.player;
