import { createSelector } from '@reduxjs/toolkit';

import { selectCentralPulse } from '../select';

export const centralPulseSelector = createSelector(
  selectCentralPulse,
  (centralPulse) => centralPulse.centralPulse,
);
