import { pow } from '..';

export function round(value: number, precision: number = 0): number {
  const exp = pow(10, precision);

  return Math.round(value * exp) / exp;
}
