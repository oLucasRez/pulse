import { RootState } from '@main/store';

import { CentralPulseState } from '../types';

export const selectCentralPulse = (state: RootState): CentralPulseState =>
  state.centralPulse;
