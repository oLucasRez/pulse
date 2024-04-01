import { RootState } from '@main/store';

import { QuestionState } from '../types';

export const selectQuestion = (state: RootState): QuestionState =>
  state.question;
