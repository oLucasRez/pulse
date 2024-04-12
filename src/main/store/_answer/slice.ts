import { createSlice, Slice } from '@reduxjs/toolkit';

import { AnswerState } from './types';

import {
  changeCurrentGameReducers,
  createAnswerReducers,
  fetchAnswerReducers,
  fetchAnswersReducers,
  signOutReducers,
} from './actions';

const initialState: AnswerState = {
  answers: [],
};

const answerSlice: Slice<AnswerState> = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    createAnswerReducers(builder);
    fetchAnswerReducers(builder);
    fetchAnswersReducers(builder);
    signOutReducers(builder);
  },
});

export const answer = answerSlice.reducer;
