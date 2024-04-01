import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectPulseModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { SubjectPulseState } from '../../types';

export const fetchSubjectPulsesAction = createAction<SubjectPulseModel[]>(
  'subjectPulse/fetchSubjectPulses',
);

export function fetchSubjectPulsesReducers(
  builder: ActionReducerMapBuilder<SubjectPulseState>,
): void {
  builder.addCase(
    fetchSubjectPulsesAction,
    (state, { payload: subjectPulses }) => {
      const newSubjectPulses = [...state.subjectPulses];

      subjectPulses.map((subjectPulse) => {
        const i = removeItem(
          newSubjectPulses,
          (value) => value.id === subjectPulse.id,
        );
        if (i === -1 && subjectPulse) newSubjectPulses.push(subjectPulse);
        else if (subjectPulse) newSubjectPulses.splice(i, 0, subjectPulse);
      });

      state.subjectPulses = newSubjectPulses;
    },
  );
}
