import { RootState } from '@main/store';

import { GameState } from '../types';

export const selectGame = (state: RootState): GameState => state.game;
