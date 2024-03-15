import { createSlice, Slice } from '@reduxjs/toolkit';

import { CentralFactState } from './types';

import {
  changeCentralFactReducers,
  changeCurrentGameReducers,
  createCentralFactReducers,
  fetchCentralFactReducers,
  signOutReducers,
} from './actions';

const initialState: CentralFactState = {
  centralFact: null,
};

const centralFactSlice: Slice<CentralFactState> = createSlice({
  name: 'centralFact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeCentralFactReducers(builder);
    createCentralFactReducers(builder);
    fetchCentralFactReducers(builder);
    signOutReducers(builder);
  },
});

export const centralFact = centralFactSlice.reducer;
