import { createSlice, Slice } from '@reduxjs/toolkit';

import { QuestionState } from './types';

import {
  changeCurrentGameReducers,
  createQuestionReducers,
  fetchQuestionsReducers,
  signOutReducers,
} from './actions';

const initialState: QuestionState = {
  questions: [],
};

const questionSlice: Slice<QuestionState> = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    createQuestionReducers(builder);
    fetchQuestionsReducers(builder);
    signOutReducers(builder);
  },
});

export const question = questionSlice.reducer;
