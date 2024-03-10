import { createSlice, Slice } from '@reduxjs/toolkit';

import { AuthState } from './types';

import {
  changeMeReducers,
  fetchMeReducers,
  signInReducers,
  signOutReducers,
} from './actions';

const initialState: AuthState = {
  me: null,
};

const authSlice: Slice<AuthState> = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    changeMeReducers(builder);
    fetchMeReducers(builder);
    signInReducers(builder);
    signOutReducers(builder);
  },
});

export const auth = authSlice.reducer;
