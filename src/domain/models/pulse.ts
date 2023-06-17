import { Result } from '@domain/models';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
} from '@domain/errors';

import { isGreaterThan, isInteger, uuid } from '@utils';

import { ID } from '@types';

/**
 * Represents a set of concentric pulses of the same nature.
 *
 * @properties
 * - `id`: Instance ID
 * - `gap`: The distance between pulses
 * - `amount`: The amount of pulses
 * - `landmarkID`: The central coordinate of the Pulse
 * - `subjectID`: The subject referenced by the Pulse
 */
export class Pulse {
  public static create(props: Pulse.CreateProps): Result<Pulse, Pulse.Errors> {
    const { id = uuid(), gap, amount, landmarkID, subjectID } = props;

    if (!landmarkID)
      return Result.reject(
        new MissingForeignKeyError('Landmark ID foreign key is missing'),
      );
    if (!subjectID)
      return Result.reject(
        new MissingForeignKeyError('Subject ID foreign key is missing'),
      );

    if (!isGreaterThan(gap, 0))
      return Result.reject(
        new NotPositiveError('Gap must be greater than zero'),
      );

    if (!isGreaterThan(amount, 0))
      return Result.reject(
        new NotPositiveError('Amount must be greater than zero'),
      );
    if (!isInteger(amount))
      return Result.reject(new NotIntegerError('Amount must be integer'));

    return Result.resolve(
      new Pulse({ id, gap, amount, landmarkID, subjectID }),
    );
  }

  private constructor(props: Pulse.Props) {
    this.id = props.id;
    this.gap = props.gap;
    this.amount = props.amount;
    this.landmarkID = props.landmarkID;
    this.subjectID = props.subjectID;
  }

  public readonly id: ID;

  public readonly gap: number;

  public readonly amount: number;

  public readonly landmarkID: ID;

  public readonly subjectID: ID;
}

export namespace Pulse {
  export type Errors =
    | MissingForeignKeyError
    | NotPositiveError
    | NotIntegerError;

  export type CreateProps = {
    id?: ID;
    gap: number;
    amount: number;
    landmarkID: ID;
    subjectID: ID;
  };

  export type Props = {
    id: ID;
    gap: number;
    amount: number;
    landmarkID: ID;
    subjectID: ID;
  };
}
