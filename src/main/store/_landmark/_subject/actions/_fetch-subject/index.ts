import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { SubjectState } from '../../types';

export const fetchSubjectAction = createAction<[string, SubjectModel | null]>(
  'subject/fetchSubject',
);

export function fetchSubjectReducers(
  builder: ActionReducerMapBuilder<SubjectState>,
): void {
  builder.addCase(fetchSubjectAction, (state, { payload: [id, subject] }) => {
    const newSubjects = [...state.subjects];

    const i = removeItem(newSubjects, (value) => value.id === id);
    if (i === -1 && subject) newSubjects.push(subject);
    else if (subject) newSubjects.splice(i, 0, subject);

    state.subjects = newSubjects;
  });
}
