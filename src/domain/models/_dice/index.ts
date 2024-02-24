import { Vector } from '@domain/utils';

import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: Vector | null;
  owner: PlayerModel | null;
}

export namespace DiceModel {
  export type JSON = Model.JSON & {
    sides: number;
    value: number | null;
    position: Vector.JSON | null;
    ownerID: PlayerModel['id'] | null;
  };
}
