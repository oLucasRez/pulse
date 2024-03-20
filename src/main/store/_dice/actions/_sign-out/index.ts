import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DiceState } from '../../types';

export const signOutAction = createAction('dice/signOut');

export function signOutReducers(
  builder: ActionReducerMapBuilder<DiceState>,
): void {
  builder.addCase(signOutAction, (state) => {
    state.dices = [];
  });
}
