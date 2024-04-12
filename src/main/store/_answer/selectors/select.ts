import { RootState } from '@main/store';

import { AnswerState } from '../types';

export const selectAnswer = (state: RootState): AnswerState => state.answer;
