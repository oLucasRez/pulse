export function round(value: number, precision: number = 0) {
  const exp = Math.pow(10, precision);

  return Math.round(value * exp) / exp;
}
