import { RootState } from '@main/store';

import { AuthState } from '../types';

export const selectAuth = (state: RootState): AuthState => state.auth;
