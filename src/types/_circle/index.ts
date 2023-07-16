import { vector } from '..';

export type circle = {
  c: vector;
  r: number;

  getCrossings(circles: circle[], tolerance?: number): vector[];
};
