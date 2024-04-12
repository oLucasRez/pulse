import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  // position: Vector | null; @todo: position é sempre igual à posição do subject do player
  ownerID: PlayerModel['id'] | null;
}

export namespace DiceModel {
  export interface DTO extends Model.DTO {
    sides: number;
    value: number | null;
    ownerID: string | null;
  }
}
