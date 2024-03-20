import { createSlice, Slice } from '@reduxjs/toolkit';

import { DiceState } from './types';

import {
  changeCurrentGameReducers,
  changeDiceReducers,
  createDiceReducers,
  fetchDiceReducers,
  fetchDicesReducers,
  signOutReducers,
} from './actions';

const initialState: DiceState = {
  dices: [],
};

const diceSlice: Slice<DiceState> = createSlice({
  name: 'dice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeDiceReducers(builder);
    createDiceReducers(builder);
    fetchDiceReducers(builder);
    fetchDicesReducers(builder);
    signOutReducers(builder);
  },
});

export const dice = diceSlice.reducer;
