import { Circle } from '@utils';

import { circle, vector } from '@types';

import { Landmark } from '..';
import { Model } from '../model';

export class Pulse<L extends Landmark = Landmark> extends Model {
  protected origin: vector;
  protected gap: number;
  protected amount: number;
  protected landmark: L;

  protected constructor(props: Pulse.NewProps<L>) {
    const { origin, gap, amount, landmark, ...modelProps } = props;

    super({ ...modelProps });

    this.origin = origin;
    this.gap = gap;
    this.amount = amount;
    this.landmark = landmark;
  }

  public getOrigin(): Pulse<L>['origin'] {
    return this.origin;
  }

  public getGap(): Pulse<L>['gap'] {
    return this.gap;
  }

  public getAmount(): Pulse<L>['amount'] {
    return this.amount;
  }

  public getLandmark(): Pulse<L>['landmark'] {
    return this.landmark;
  }

  public getCircles(): circle[] {
    const circles: circle[] = [];

    for (let i = 1; i <= this.amount; i++)
      circles.push(Circle(this.origin, i * this.gap));

    return circles;
  }

  public getLastCircle(): circle | null {
    const lastCircle = this.getCircles().pop() ?? null;

    return lastCircle;
  }

  protected updateAmount(value: Pulse<L>['amount']): void {
    if (value < this.amount) throw 'Forbidden to decrease amount';

    this.amount = value;
  }
}

export namespace Pulse {
  export type NewProps<L extends Landmark> = Model.NewProps & {
    origin: Pulse<L>['origin'];
    gap: Pulse<L>['gap'];
    amount: Pulse<L>['amount'];
    landmark: Pulse<L>['landmark'];
  };
}
