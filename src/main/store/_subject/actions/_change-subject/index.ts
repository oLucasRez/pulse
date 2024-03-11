import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SubjectModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { SubjectState } from '../../types';

export const changeSubjectAction = createAction<SubjectModel>(
  'subject/changeSubject',
);

export function changeSubjectReducers(
  builder: ActionReducerMapBuilder<SubjectState>,
): void {
  builder.addCase(changeSubjectAction, (state, { payload: subject }) => {
    const newSubjects = [...state.subjects];

    const i = removeItem(newSubjects, (value) => value.id === subject.id);
    if (i === -1) newSubjects.push(subject);
    else newSubjects.splice(i, 0, subject);

    state.subjects = newSubjects;
  });
}
