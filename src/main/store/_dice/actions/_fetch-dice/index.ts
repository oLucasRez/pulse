import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DiceModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { DiceState } from '../../types';

export const fetchDiceAction =
  createAction<[string, DiceModel | null]>('dice/fetchDice');

export function fetchDiceReducers(
  builder: ActionReducerMapBuilder<DiceState>,
): void {
  builder.addCase(fetchDiceAction, (state, { payload: [id, dice] }) => {
    const newDices = [...state.dices];

    const i = removeItem(newDices, (value) => value.id === id);
    if (i === -1 && dice) newDices.push(dice);
    else if (dice) newDices.splice(i, 0, dice);

    state.dices = newDices;
  });
}
