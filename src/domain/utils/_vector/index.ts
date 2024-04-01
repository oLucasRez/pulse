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

  public static sum(
    u: Vector,
    v: Vector,
    space: VectorSpace = VectorSpace.identity,
  ): Vector {
    const normU = u.space.inverse().mult(u);
    const normV = v.space.inverse().mult(v);

    return space.mult(new Vector([normU.x + normV.x, normU.y + normV.y]));
  }
  public sum(v: Vector): Vector {
    return Vector.sum(this, v);
  }

  public static sub(u: Vector, v: Vector): Vector {
    return new Vector([v.x - u.x, v.y - u.y]);
  }
  public sub(v: Vector): Vector {
    return Vector.sub(this, v);
  }

  public static mult(u: Vector, a: number): Vector {
    return new Vector([u.x * a, u.y * a]);
  }
  public mult(a: number): Vector {
    return Vector.mult(this, a);
  }

  public static mod(u: Vector): number {
    return Math.sqrt(u.x * u.x + u.y * u.y);
  }
  public mag(): number {
    return Vector.mod(this);
  }

  public static norm(u: Vector): Vector {
    const mod = Vector.mod(u) || 1;

    return new Vector([u.x / mod, u.y / mod]);
  }

  public norm(): Vector {
    return Vector.norm(this);
  }

  public static flip(u: Vector, axis: 'x' | 'y'): Vector {
    if (axis === 'x') return new Vector([-u.x, u.y]);
    return new Vector([u.x, -u.y]);
  }

  public flip(axis: 'x' | 'y'): Vector {
    return Vector.flip(this, axis);
  }
}

export namespace Vector {
  export type Coords = { x: number; y: number } | [number, number];

  export type JSON = { x: number; y: number };
}
