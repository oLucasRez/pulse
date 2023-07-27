export type vector = {
  x: number;
  y: number;

  toDTO(): vector.DTO;
  mag(): number;
  add(u: vector): vector;
  sub(u: vector): vector;
  mult(a: number): vector;
  div(a: number): vector;
  toString(precision?: number): string;
};

export namespace vector {
  export type DTO = {
    x: number;
    y: number;
  };
}
