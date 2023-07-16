import { Circle, uuid } from '@utils';

import { circle, vector } from '@types';

import { Landmark } from '..';

type ConstructorProps = {
  id?: string;
  origin: vector;
  gap: number;
  amount: number;
  landmark: Landmark;
};

export class Pulse {
  public readonly id: string;

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

  private _landmark: Landmark;
  public get landmark(): Landmark {
    return this._landmark;
  }

  protected constructor(props: ConstructorProps) {
    const { id = uuid(), origin, gap, amount, landmark } = props;

    this.id = id;
    this._origin = origin;
    this._gap = gap;
    this._circles = [];
    this._landmark = landmark;

    this.updateAmount(amount);
  }

  protected updateAmount(value: number): void {
    for (let i = this._circles.length; i <= value; i++)
      this._circles.push(Circle(this.origin, i * this.gap));
  }
}
