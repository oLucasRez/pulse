import { createSelector } from '@reduxjs/toolkit';

import { selectAnswer } from '../select';

export const answersSelector = createSelector(
  selectAnswer,
  (answer) => answer.answers,
);
