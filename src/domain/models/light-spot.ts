import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * ...
 *
 * @properties
 * - `id`: Instance ID
 */
export class LightSpot {
  public static create(
    props: LightSpot.CreateProps,
  ): Result<LightSpot, LightSpot.Errors> {
    const { id = uuid(), landmarkID, subjectID } = props;

    if (!landmarkID)
      return Result.reject(
        new MissingForeignKeyError('Landmark ID foreign key is missing'),
      );

    if (!subjectID)
      return Result.reject(
        new MissingForeignKeyError('Subject ID foreign key is missing'),
      );

    return Result.resolve(new LightSpot({ id, landmarkID, subjectID }));
  }

  private constructor(props: LightSpot.Props) {
    this.id = props.id;
    this.landmarkID = props.landmarkID;
    this.subjectID = props.subjectID;
  }

  public readonly id: ID;

  public readonly landmarkID: ID;

  public readonly subjectID: ID;
}

export namespace LightSpot {
  export type Errors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    landmarkID: ID;
    subjectID: ID;
  };

  export type Props = {
    id: ID;
    landmarkID: ID;
    subjectID: ID;
  };
}
