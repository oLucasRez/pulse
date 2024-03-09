import { createSelector } from '@reduxjs/toolkit';

import { selectAuth } from '../select';

export const meSelector = createSelector(selectAuth, (auth) => auth.me);
