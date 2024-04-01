import { createSlice, Slice } from '@reduxjs/toolkit';

import { SubjectPulseState } from './types';

import {
  changeCurrentGameReducers,
  createSubjectPulseReducers,
  fetchSubjectPulseReducers,
  fetchSubjectPulsesReducers,
  signOutReducers,
} from './actions';

const initialState: SubjectPulseState = {
  subjectPulses: [],
};

const subjectPulseSlice: Slice<SubjectPulseState> = createSlice({
  name: 'subjectPulse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    createSubjectPulseReducers(builder);
    fetchSubjectPulseReducers(builder);
    fetchSubjectPulsesReducers(builder);
    signOutReducers(builder);
  },
});

export const subjectPulse = subjectPulseSlice.reducer;
