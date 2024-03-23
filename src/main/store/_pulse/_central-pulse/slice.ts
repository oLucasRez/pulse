import { createSlice, Slice } from '@reduxjs/toolkit';

import { CentralPulseState } from './types';

import {
  changeCentralPulseReducers,
  changeCurrentGameReducers,
  createCentralPulseReducers,
  fetchCentralPulseReducers,
  signOutReducers,
} from './actions';

const initialState: CentralPulseState = {
  centralPulse: null,
};

const centralPulseSlice: Slice<CentralPulseState> = createSlice({
  name: 'centralPulse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeCentralPulseReducers(builder);
    createCentralPulseReducers(builder);
    fetchCentralPulseReducers(builder);
    signOutReducers(builder);
  },
});

export const centralPulse = centralPulseSlice.reducer;
