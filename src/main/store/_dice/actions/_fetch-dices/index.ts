import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { DiceModel } from '@domain/models';
import { removeItem } from '@domain/utils';

import { DiceState } from '../../types';

export const fetchDicesAction = createAction<DiceModel[]>('dice/fetchDices');

export function fetchDicesReducers(
  builder: ActionReducerMapBuilder<DiceState>,
): void {
  builder.addCase(fetchDicesAction, (state, { payload: dices }) => {
    const newDices = [...state.dices];

    dices.map((dice) => {
      const i = removeItem(newDices, (value) => value.id === dice.id);
      if (i === -1 && dice) newDices.push(dice);
      else if (dice) newDices.splice(i, 0, dice);
    });

    state.dices = newDices;
  });
}
