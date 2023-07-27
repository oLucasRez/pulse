import { vector } from '..';

export type circle = {
  c: vector;
  r: number;

  toDTO(): circle.DTO;
};

export namespace circle {
  export type DTO = {
    c: vector.DTO;
    r: number;
  };
}
