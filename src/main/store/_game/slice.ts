import { createSlice, Slice } from '@reduxjs/toolkit';

import { GameState } from './types';

import {
  changeCurrentGameReducers,
  changeGameReducers,
  createGameReducers,
  deleteGameReducers,
  fetchGameReducers,
  fetchGamesReducers,
  signOutReducers,
  startGameReducers,
} from './actions';

const initialState: GameState = {
  games: [],
};

const gameSlice: Slice<GameState> = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeCurrentGameReducers(builder);
    changeGameReducers(builder);
    createGameReducers(builder);
    deleteGameReducers(builder);
    fetchGameReducers(builder);
    fetchGamesReducers(builder);
    signOutReducers(builder);
    startGameReducers(builder);
  },
});

export const game = gameSlice.reducer;
