import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectPulseModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { SubjectPulseState } from '../../types';

export const fetchSubjectPulseAction = createAction<
  [string, SubjectPulseModel | null]
>('subjectPulse/fetchSubjectPulse');

export function fetchSubjectPulseReducers(
  builder: ActionReducerMapBuilder<SubjectPulseState>,
): void {
  builder.addCase(
    fetchSubjectPulseAction,
    (state, { payload: [id, subjectPulse] }) => {
      const newSubjectPulses = [...state.subjectPulses];

      const i = removeItem(newSubjectPulses, (value) => value.id === id);
      if (i === -1 && subjectPulse) newSubjectPulses.push(subjectPulse);
      else if (subjectPulse) newSubjectPulses.splice(i, 0, subjectPulse);

      state.subjectPulses = newSubjectPulses;
    },
  );
}
