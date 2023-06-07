import {
  EmptyStringError,
  NotIntegerError,
  NotPositiveError,
} from '@common/domain/errors';
import { Vector } from '@common/domain/models';
import { Result } from '@meta/domain/models';

import { uuid } from '@meta/utils';

/**
 * Represents a set of concentric pulses of the same nature.
 *
 * @properties
 * - `id`: Instance ID
 * - `origin`: The central (x,y) coordinate of the Pulse
 * - `gap`: The distance between pulses
 * - `amout`: The amount of pulses
 * - `subjectID`: The subject referenced by the Pulse
 *
 * @throws
 */
export class Pulse {
  public static create(props: Pulse.CreateProps): Result<Pulse, Pulse.Errors> {
    const { id = uuid(), gap, amount, subjectID } = props;

    const origin = Vector.create(props.origin).value;

    if (subjectID === '') return Result.reject(new EmptyStringError());

    if (gap <= 0) return Result.reject(new NotPositiveError());

    if (amount <= 0) return Result.reject(new NotPositiveError());
    if (amount % 1 !== 0) return Result.reject(new NotIntegerError());

    return Result.resolve(new Pulse({ id, origin, gap, amount, subjectID }));
  }

  private constructor(props: Pulse.Props) {
    this.id = props.id;
    this.origin = props.origin;
    this.gap = props.gap;
    this.amount = props.amount;
    this.subjectID = props.subjectID;
  }

  public readonly id: string;
  public readonly origin: Vector;
  public readonly gap: number;
  public readonly amount: number;
  public readonly subjectID: string;
}

export namespace Pulse {
  export type Errors = EmptyStringError | NotPositiveError | NotIntegerError;

  export type CreateProps = {
    id?: string;
    origin: Vector.CreateProps;
    gap: number;
    amount: number;
    subjectID: string;
  };

  export type Props = {
    id: string;
    origin: Vector;
    gap: number;
    amount: number;
    subjectID: string;
  };
}
