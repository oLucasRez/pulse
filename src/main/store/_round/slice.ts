import { createSlice, Slice } from '@reduxjs/toolkit';

import { RoundState } from './types';

import {
  changeCurrentGameReducers,
  changeRoundReducers,
  createRoundReducers,
  fetchRoundReducers,
  fetchRoundsReducers,
  signOutReducers,
} from './actions';

const initialState: RoundState = {
  rounds: [],
};

const roundSlice: Slice<RoundState> = createSlice({
  name: 'round',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeRoundReducers(builder);
    createRoundReducers(builder);
    fetchRoundReducers(builder);
    fetchRoundsReducers(builder);
    signOutReducers(builder);
  },
});

export const round = roundSlice.reducer;
