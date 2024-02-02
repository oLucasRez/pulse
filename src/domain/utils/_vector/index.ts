import { vector } from '@domain/types';

export function Vector(x: number, y: number): vector {
  return Object.freeze({ x, y });
}
