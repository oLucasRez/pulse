import { createSlice, Slice } from '@reduxjs/toolkit';

import { GameState } from './types';

import {
  changeGameReducers,
  createGameReducers,
  deleteGameReducers,
  fetchGameReducers,
  fetchGamesReducers,
  startGameReducers,
} from '.';

const initialState: GameState = {
  games: [],
};

const gameSlice: Slice<GameState> = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeGameReducers(builder);
    createGameReducers(builder);
    deleteGameReducers(builder);
    fetchGameReducers(builder);
    fetchGamesReducers(builder);
    startGameReducers(builder);
  },
});

export const game = gameSlice.reducer;
