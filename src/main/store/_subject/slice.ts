import { createSlice, Slice } from '@reduxjs/toolkit';

import { SubjectState } from './types';

import {
  changeCurrentGameReducers,
  changeSubjectReducers,
  createSubjectReducers,
  fetchSubjectReducers,
  fetchSubjectsReducers,
  signOutReducers,
} from './actions';

const initialState: SubjectState = {
  subjects: [],
};

const subjectSlice: Slice<SubjectState> = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeSubjectReducers(builder);
    createSubjectReducers(builder);
    fetchSubjectReducers(builder);
    fetchSubjectsReducers(builder);
    signOutReducers(builder);
  },
});

export const subject = subjectSlice.reducer;
