export type vector = {
  x: number;
  y: number;

  mag(): number;
  add(u: vector): vector;
  sub(u: vector): vector;
  mult(a: number): vector;
  div(a: number): vector;
  toString(precision?: number): string;
};
