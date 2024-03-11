import { createSelector } from '@reduxjs/toolkit';

import { myPlayerSelector } from '@main/store';

import { selectSubject } from '../select';

export const mySubjectSelector = createSelector(
  [myPlayerSelector, selectSubject],
  (myPlayer, subject) =>
    subject.subjects.find((value) => value.id === myPlayer?.subjectID) ?? null,
);
