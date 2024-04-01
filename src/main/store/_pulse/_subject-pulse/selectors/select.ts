import { RootState } from '@main/store';

import { SubjectPulseState } from '../types';

export const selectSubjectPulse = (state: RootState): SubjectPulseState =>
  state.subjectPulse;
