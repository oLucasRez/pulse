import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectModel } from '@domain/models';

import { SubjectState } from '../../types';

export const fetchSubjectsAction = createAction<SubjectModel[]>(
  'subject/fetchSubjects',
);

export function fetchSubjectsReducers(
  builder: ActionReducerMapBuilder<SubjectState>,
): void {
  builder.addCase(fetchSubjectsAction, (state, { payload: subjects }) => {
    state.subjects = subjects;
  });
}
