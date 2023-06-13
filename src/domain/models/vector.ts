import { Result } from '@domain/models';

/**
 * Is a 2D entity with x and y components, used for direction and magnitude.
 *
 * @properties
 * - `x`: The horizontal coordinate
 * - `y`: The vertical coordinate
 */
export class Vector {
  public static create(
    props: Vector.CreateProps,
  ): Result<Vector, Vector.Errors> {
    const x = props[0] ?? (props as any).x;
    const y = props[1] ?? (props as any).y;

    return Result.resolve(new Vector({ x, y }));
  }

  private constructor(props: Vector.Props) {
    this.x = props.x;
    this.y = props.y;
  }

  public readonly x: number;
  public readonly y: number;
}

export namespace Vector {
  export type Errors = null;

  export type CreateProps = { x: number; y: number } | [number, number];

  export type Props = { x: number; y: number };
}
