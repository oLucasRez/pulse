import { createSelector } from '@reduxjs/toolkit';

import { selectQuestion } from '../select';

export const questionsSelector = createSelector(
  selectQuestion,
  (question) => question.questions,
);
