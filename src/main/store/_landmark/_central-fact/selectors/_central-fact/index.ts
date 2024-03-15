import { createSelector } from '@reduxjs/toolkit';

import { selectCentralFact } from '../select';

export const centralFactSelector = createSelector(
  selectCentralFact,
  (centralFact) => centralFact.centralFact,
);
