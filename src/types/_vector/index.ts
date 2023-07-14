export type vector = {
  x: number;
  y: number;
  mag(): number;
  '+'(u: vector): vector;
  '-'(u: vector): vector;
  '*'(a: number): vector;
  '/'(a: number): vector;
  toString(precision?: number): string;
};
