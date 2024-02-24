import { Matrix, VectorSpace } from '..';

export class Vector {
  public x: number;
  public y: number;
  public space: VectorSpace;

  public constructor(
    coords: Vector.Coords,
    space: VectorSpace = VectorSpace.identity,
  ) {
    const _coords = coords as any;

    this.x = _coords.x ?? _coords[0];
    this.y = _coords.y ?? _coords[1];
    this.space = space;
  }

  public toJSON(): Vector.JSON {
    return { x: this.x, y: this.y };
  }

  public static fromJSON(json: Vector.JSON): Vector {
    return new Vector(json);
  }

  public toMatrix(): Matrix {
    return [[this.x, this.y, 1]];
  }
}

export namespace Vector {
  export type Coords = { x: number; y: number } | [number, number];

  export type JSON = { x: number; y: number };
}
