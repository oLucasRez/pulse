import { Circle } from '@utils';

import { circle, vector } from '@types';

import { Landmark } from '..';
import { Model } from '../model';

export class Pulse<LandmarkType extends Landmark = Landmark> extends Model {
  protected origin: vector;
  protected gap: number;
  protected circles: circle[];
  protected landmark: LandmarkType;

  protected constructor(props: Pulse.NewProps<LandmarkType>) {
    const { origin, gap, amount, landmark, ...modelProps } = props;

    super({ ...modelProps });

    this.origin = origin;
    this.gap = gap;
    this.circles = [];
    this.landmark = landmark;

    this.updateAmount(amount);
  }

  public getCircles(): circle[] {
    return this.circles;
  }

  public toDTO(): Pulse.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      origin: this.origin.toDTO(),
      gap: this.gap,
      amount: this.getAmount(),
      circles: this.circles.map((circle) => circle.toDTO()),
      lastCircle: this.getLastCircle()?.toDTO() || null,
      landmarkID: this.landmark.id,
    });
  }

  public getLastCircle(): circle | null {
    const lastCircle = this.circles.reduce(
      (lastOne, circle) => (lastOne?.r ?? 0 < circle.r ? circle : lastOne),
      null as circle | null,
    );

    return lastCircle;
  }

  public getAmount(): number {
    const amount = this.circles.length;

    return amount;
  }

  protected updateAmount(value: number): void {
    for (let i = this.circles.length + 1; i <= value; i++)
      this.circles.push(Circle(this.origin, i * this.gap));
  }
}

export namespace Pulse {
  export type DTO = Model.DTO & {
    origin: vector.DTO;
    gap: number;
    amount: number;
    circles: circle.DTO[];
    lastCircle: circle.DTO | null;
    landmarkID: string;
  };

  export type NewProps<LandmarkType extends Landmark> = Model.NewProps & {
    origin: vector;
    gap: number;
    amount: number;
    landmark: LandmarkType;
  };
}
