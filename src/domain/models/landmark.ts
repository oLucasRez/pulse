import { Result, Vector } from '@domain/models';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * Represents an event - a relevant point on the map, like pulse origins,
 * question positions, light-spot positions, etc.
 *
 * @properties
 * - `id`: Instance ID
 * - `position`: The position on the map
 */
export class Landmark {
  public static create(
    props: Landmark.CreateProps,
  ): Result<Landmark, Landmark.Errors> {
    const { id = uuid() } = props;

    const position = Vector.create(props.position).await();

    return Result.resolve(new Landmark({ id, position }));
  }

  private constructor(props: Landmark.Props) {
    this.id = props.id;
    this.position = props.position;
  }

  public readonly id: ID;

  public readonly position: Vector;
}

export namespace Landmark {
  export type Errors = Vector.Errors;

  export type CreateProps = {
    id?: ID;
    position: Vector.CreateProps;
  };

  export type Props = {
    id: ID;
    position: Vector;
  };
}
