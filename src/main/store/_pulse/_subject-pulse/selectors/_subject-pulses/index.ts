import { createSelector } from '@reduxjs/toolkit';

import { selectSubjectPulse } from '../select';

export const subjectPulsesSelector = createSelector(
  selectSubjectPulse,
  (subjectPulse) => subjectPulse.subjectPulses,
);
