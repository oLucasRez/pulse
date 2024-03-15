import { RootState } from '@main/store';

import { CentralFactState } from '../types';

export const selectCentralFact = (state: RootState): CentralFactState =>
  state.centralFact;
