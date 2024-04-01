import { createSelector } from '@reduxjs/toolkit';

import { selectSubject } from '../select';

export const subjectsSelector = createSelector(
  selectSubject,
  (subject) => subject.subjects,
);
