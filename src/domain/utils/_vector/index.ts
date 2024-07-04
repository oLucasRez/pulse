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
  public sum(v: Vector): Vector;
  public sum(x: number, y: number): Vector;
  public sum(v: Vector | number, y?: number): Vector {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (typeof v === 'number') return Vector.sum(this, new Vector([v, y!]));
    return Vector.sum(this, v);
  }

  public static sub(u: Vector, v: Vector): Vector {
    return new Vector([v.x - u.x, v.y - u.y]);
  }
  public sub(v: Vector): Vector {
    return Vector.sub(this, v);
  }

  public static mult(u: Vector, a: Vector): Vector;
  public static mult(u: Vector, a: number): Vector;
  public static mult(u: Vector, a: number, b: number): Vector;
  public static mult(u: Vector, a: Vector | number, b?: number): Vector {
    if (b !== undefined && typeof a === 'number')
      return new Vector([u.x * a, u.y * b]);
    if (typeof a === 'number') return new Vector([u.x * a, u.y * a]);
    else return new Vector([u.x * a.x, u.y * a.y]);
  }
  public mult(a: Vector): Vector;
  public mult(a: number): Vector;
  public mult(a: number, b: number): Vector;
  public mult(a: Vector | number, b?: number): Vector {
    if (b !== undefined && typeof a === 'number')
      return Vector.mult(this, new Vector([a, b]));
    if (typeof a === 'number') return Vector.mult(this, a);
    else return Vector.mult(this, a);
  }

  public dot(u: Vector): number {
    return this.x * u.x + this.y * u.y;
  }

  public div(a: number): Vector {
    return this.mult(1 / a);
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

  public proj(on: Vector): Vector {
    return on.mult(this.dot(on) / (on.mag() * on.mag()));
  }

  public bounce(axis: Vector): Vector {
    const x = this.proj(axis);
    const y = this.sub(x);

    return y.sum(x).mult(-1);
  }

  public static flip(u: Vector, axis: 'x' | 'y'): Vector {
    if (axis === 'x') return new Vector([-u.x, u.y]);
    return new Vector([u.x, -u.y]);
  }

  public flip(axis: 'x' | 'y'): Vector {
    if (axis === 'x') return this.bounce(new Vector([1, 0]));
    return this.bounce(new Vector([0, 1]));
  }

  public projX(): Vector {
    return new Vector([this.x, 0]);
  }

  public projY(): Vector {
    return new Vector([0, this.y]);
  }
}

export namespace Vector {
  export type Coords = { x: number; y: number } | [number, number];

  export type JSON = { x: number; y: number };
}
