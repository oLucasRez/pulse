import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { answer } from './_answer';
import { auth } from './_auth';
import { dice } from './_dice';
import { game } from './_game';
import { centralFact, question, subject } from './_landmark';
import { player } from './_player';
import { centralPulse, subjectPulse } from './_pulse';
import { round } from './_round';

const reducer = combineReducers({
  answer,
  auth,
  dice,
  game,
  centralFact,
  question,
  subject,
  player,
  centralPulse,
  subjectPulse,
  round,
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
