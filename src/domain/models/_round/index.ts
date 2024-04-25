import { Model } from '..';

export interface RoundModel extends Model {
  i: number | null;
  clockwise: RoundModel.Clockwise | null;
  finished: boolean;
}

export namespace RoundModel {
  export type Clockwise = 'clockwise' | 'counterclockwise';

  export interface DTO extends Model.DTO {
    i: number | null;
    clockwise: RoundModel.Clockwise | null;
    finished: boolean;
  }
}
