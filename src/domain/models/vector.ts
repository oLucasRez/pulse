import { Result } from '@domain/models';

import { NotNumberError } from '@domain/errors';

import { isNumber } from '@utils';

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
    if (!isNumber(x)) Result.reject(new NotNumberError('X must be a number'));

    const y = props[1] ?? (props as any).y;
    if (!isNumber(y)) Result.reject(new NotNumberError('Y must be a number'));

    return Result.resolve(new Vector({ x, y }));
  }

  public update(props: Vector.UpdateProps): Result<Vector, Vector.Errors> {
    if ('x' in props || 0 in props) {
      const x = props[0] ?? (props as any).x;
      if (!isNumber(x)) Result.reject(new NotNumberError('X must be a number'));

      this._x = x;
    }

    if ('y' in props || 1 in props) {
      const y = props[1] ?? (props as any).y;
      if (!isNumber(y)) Result.reject(new NotNumberError('Y must be a number'));

      this._y = y;
    }

    return Result.resolve(this);
  }

  private constructor(props: Vector.Props) {
    this._x = props.x;
    this._y = props.y;
  }

  private _x: number;
  get x() {
    return this._x;
  }

  private _y: number;
  get y() {
    return this._y;
  }
}

export namespace Vector {
  export type Errors = null;

  export type CreateProps = { x: number; y: number } | { 0: number; 1: number };

  export type UpdateProps =
    | { x?: number; y?: number }
    | { 0?: number; 1?: number };

  export type Props = { x: number; y: number };
}
