import { RootState } from '@main/store';

import { SubjectState } from '../types';

export const selectSubject = (state: RootState): SubjectState => state.subject;
