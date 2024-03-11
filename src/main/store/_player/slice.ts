import { createSlice, Slice } from '@reduxjs/toolkit';

import { PlayerState } from './types';

import {
  banPlayerReducers,
  changeCurrentGameReducers,
  changePlayerReducers,
  createPlayerReducers,
  deletePlayerReducers,
  fetchPlayerReducers,
  fetchPlayersReducers,
  signOutReducers,
} from './actions';

const initialState: PlayerState = {
  players: [],
};

const playerSlice: Slice<PlayerState> = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    banPlayerReducers(builder);
    changeCurrentGameReducers(builder);
    changePlayerReducers(builder);
    createPlayerReducers(builder);
    deletePlayerReducers(builder);
    fetchPlayerReducers(builder);
    fetchPlayersReducers(builder);
    signOutReducers(builder);
  },
});

export const player = playerSlice.reducer;
