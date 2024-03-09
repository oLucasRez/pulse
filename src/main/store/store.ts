import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { auth } from './_auth';
import { game } from './_game';
import { player } from './_player';

const reducer = combineReducers({ auth, game, player });

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
