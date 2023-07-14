import { uuid } from '@utils';

import { vector } from '@types';

import { Landmark } from '..';

export interface Pulse {
  id: string;
  origin: vector;
  gap: number;
  amount: number;
  landmark: Landmark;
}

type ConstructorProps = {
  id?: string;
  origin: vector;
  gap: number;
  amount: number;
  landmark: Landmark;
};

export class Pulse implements Pulse {
  constructor(props: ConstructorProps) {
    const { id = uuid(), origin, gap, amount, landmark } = props;

    this.origin = origin;
    this.id = id;
    this.gap = gap;
    this.amount = amount;
    this.landmark = landmark;
  }
}
