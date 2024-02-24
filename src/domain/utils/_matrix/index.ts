import { InvalidDataError } from '@domain/errors';

import { Vector } from '..';

export type Matrix = number[][];

export namespace Matrix {
  export function dot(m1: Matrix, m2: Matrix): Matrix {
    if (m1[0].length !== m2.length) {
      console.log({ m1, m2 });
      throw new InvalidDataError({
        message: 'Matrices are not compatible for dot product',
      });
    }

    const result: Matrix = [];

    for (let i = 0; i < m1.length; i++) {
      result[i] = [];
      for (let j = 0; j < m2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
        }
        result[i][j] = sum;
      }
    }

    return result;
  }

  export function toVector(m: Matrix): Vector {
    if (m.length === 1) return new Vector([m[0][0], m[0][1]]);
    else return new Vector([m[0][0], m[1][0]]);
  }

  export function transpose(matrix: Matrix): Matrix {
    const transposed: number[][] = [];

    for (let i = 0; i < matrix[0].length; i++) transposed[i] = [];

    for (let i = 0; i < matrix.length; i++)
      for (let j = 0; j < matrix[i].length; j++)
        transposed[j][i] = matrix[i][j];

    return transposed;
  }
}
