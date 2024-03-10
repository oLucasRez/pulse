import { createSlice, Slice } from '@reduxjs/toolkit';

import { GameState } from './types';

import {
  changeGameReducers,
  createGameReducers,
  deleteGameReducers,
  fetchCurrentGameReducers,
  fetchGameReducers,
  fetchGamesReducers,
  signOutReducers,
  startGameReducers,
} from './actions';

const initialState: GameState = {
  games: [],
  currentGame: null,
};

const gameSlice: Slice<GameState> = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeGameReducers(builder);
    createGameReducers(builder);
    deleteGameReducers(builder);
    fetchCurrentGameReducers(builder);
    fetchGameReducers(builder);
    fetchGamesReducers(builder);
    signOutReducers(builder);
    startGameReducers(builder);
  },
});

export const game = gameSlice.reducer;
