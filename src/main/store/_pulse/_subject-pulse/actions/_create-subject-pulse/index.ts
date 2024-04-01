import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectPulseModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { SubjectPulseState } from '../../types';

export const createSubjectPulseAction = createAction<SubjectPulseModel>(
  'subjectPulse/createSubjectPulse',
);

export function createSubjectPulseReducers(
  builder: ActionReducerMapBuilder<SubjectPulseState>,
): void {
  builder.addCase(
    createSubjectPulseAction,
    (state, { payload: subjectPulse }) => {
      const newSubjectPulses = [...state.subjectPulses];

      const i = removeItem(
        newSubjectPulses,
        (value) => value.id === subjectPulse.id,
      );
      if (i === -1) newSubjectPulses.push(subjectPulse);
      else newSubjectPulses.splice(i, 0, subjectPulse);

      state.subjectPulses = newSubjectPulses;
    },
  );
}
