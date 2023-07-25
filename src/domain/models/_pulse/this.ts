import { Circle } from '@utils';

import { circle, vector } from '@types';

import { Landmark } from '..';
import { Model } from '../this';

export class Pulse<LandmarkType extends Landmark = Landmark> extends Model {
  private _origin: vector;
  public get origin(): vector {
    return this._origin;
  }

  protected _circles: circle[];
  public get circles(): circle[] {
    return this._circles;
  }

  public get lastCircle(): circle | null {
    return this._circles.reduce(
      (circleA, circleB) => (circleA?.r ?? 0 > circleB.r ? circleA : circleB),
      null as circle | null,
    );
  }

  public get amount(): number {
    return this._circles.length;
  }

  private _gap: number;
  public get gap(): number {
    return this._gap;
  }

  private _landmark: LandmarkType;
  public get landmark(): LandmarkType {
    return this._landmark;
  }

  protected constructor(props: Pulse.NewProps<LandmarkType>) {
    const { origin, gap, amount, landmark, ...modelProps } = props;

    super({ ...modelProps });

    this._origin = origin;
    this._gap = gap;
    this._circles = [];
    this._landmark = landmark;

    this.updateAmount(amount);
  }

  protected updateAmount(value: number): void {
    for (let i = this._circles.length + 1; i <= value; i++)
      this._circles.push(Circle(this.origin, i * this.gap));
  }
}

export namespace Pulse {
  export type NewProps<LandmarkType extends Landmark> = Model.NewProps & {
    origin: vector;
    gap: number;
    amount: number;
    landmark: LandmarkType;
  };
}
