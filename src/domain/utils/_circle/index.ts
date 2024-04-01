import { Vector } from '..';

export class Circle {
  public c: Vector;
  public r: number;

  public constructor(center: Vector, radius: number) {
    this.c = center;
    this.r = radius;
  }

  public toJSON(): Circle.JSON {
    return { c: this.c.toJSON(), r: this.r };
  }

  public static fromJSON(json: Circle.JSON): Circle {
    return new Circle(Vector.fromJSON(json.c), json.r);
  }
}

export namespace Circle {
  export type JSON = {
    c: Vector.JSON;
    r: number;
  };
}
