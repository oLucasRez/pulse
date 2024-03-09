import { createSlice, Slice } from '@reduxjs/toolkit';

import { PlayerState } from './types';

import {
  banPlayerReducers,
  changePlayerReducers,
  createPlayerReducers,
  deletePlayerReducers,
  fetchPlayerReducers,
  fetchPlayersReducers,
} from '.';

const initialState: PlayerState = {
  players: [],
};

const playerSlice: Slice<PlayerState> = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    banPlayerReducers(builder);
    changePlayerReducers(builder);
    createPlayerReducers(builder);
    deletePlayerReducers(builder);
    fetchPlayerReducers(builder);
    fetchPlayersReducers(builder);
  },
});

export const player = playerSlice.reducer;
