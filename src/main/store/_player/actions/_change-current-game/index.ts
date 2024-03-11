import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GameModel } from '@domain/models';

import { PlayerState } from '../../types';

export const changeCurrentGameAction = createAction<GameModel | null>(
  'player/changeCurrentGame',
);

export function changeCurrentGameReducers(
  builder: ActionReducerMapBuilder<PlayerState>,
): void {
  builder.addCase(changeCurrentGameAction, (state) => {
    state.players = [];
  });
}
