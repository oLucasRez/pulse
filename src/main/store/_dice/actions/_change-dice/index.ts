import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DiceModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { DiceState } from '../../types';

export const changeDiceAction = createAction<DiceModel>('dice/changeDice');

export function changeDiceReducers(
  builder: ActionReducerMapBuilder<DiceState>,
): void {
  builder.addCase(changeDiceAction, (state, { payload: dice }) => {
    const newDices = [...state.dices];

    const i = removeItem(newDices, (value) => value.id === dice.id);
    if (i === -1) newDices.push(dice);
    else newDices.splice(i, 0, dice);

    state.dices = newDices;
  });
}
