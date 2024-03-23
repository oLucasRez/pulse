import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { auth } from './_auth';
import { dice } from './_dice';
import { game } from './_game';
import { centralFact } from './_landmark';
import { player } from './_player';
import { centralPulse } from './_pulse';
import { round } from './_round';
import { subject } from './_subject';

const reducer = combineReducers({
  auth,
  dice,
  game,
  centralFact,
  player,
  centralPulse,
  round,
  subject,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
