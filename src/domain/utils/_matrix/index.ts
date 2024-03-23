import { InvalidDataError } from '@domain/errors';

import { Vector } from '..';

export type Matrix = number[][];

export namespace Matrix {
  export function dot(m1: Matrix, m2: Matrix): Matrix {
    if (m1[0].length !== m2.length) {
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

  export function inverse(matrix: Matrix): Matrix {
    const n = matrix.length;
    if (n !== matrix[0].length)
      throw new InvalidDataError({
        message: 'Matrix is not squared',
      });

    // Cria uma matriz identidade do mesmo tamanho da matriz original
    const identityMatrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      identityMatrix.push(new Array(n).fill(0));
      identityMatrix[i][i] = 1;
    }

    // Função auxiliar para trocar linhas na matriz
    function swapRows(a: number[][], i: number, j: number): any {
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }

    // Função auxiliar para multiplicar uma linha da matriz por um escalar
    function multiplyRow(row: number[], scalar: number): Matrix[0] {
      return row.map((value) => value * scalar);
    }

    // Função auxiliar para somar linhas multiplicadas por um escalar
    function addScaledRow(
      row1: number[],
      row2: number[],
      scalar: number,
    ): Matrix[0] {
      return row1.map((value, index) => value + row2[index] * scalar);
    }

    // Cria uma cópia da matriz original para não modificar a original
    const clonedMatrix = matrix.map((row) => [...row]);

    // Aplica o método de eliminação de Gauss-Jordan
    for (let i = 0; i < n; i++) {
      // Encontra o pivô na linha i
      let pivotRow = i;
      for (let j = i + 1; j < n; j++) {
        if (
          Math.abs(clonedMatrix[j][i]) > Math.abs(clonedMatrix[pivotRow][i])
        ) {
          pivotRow = j;
        }
      }

      // Troca linhas para garantir que o pivô seja não-zero
      if (pivotRow !== i) {
        swapRows(clonedMatrix, pivotRow, i);
        swapRows(identityMatrix, pivotRow, i);
      }

      // Divide a linha pelo pivô para tornar o pivô igual a 1
      const pivot = clonedMatrix[i][i];
      if (pivot === 0) {
        throw new Error('A matriz não é inversível.');
      }
      clonedMatrix[i] = multiplyRow(clonedMatrix[i], 1 / pivot);
      identityMatrix[i] = multiplyRow(identityMatrix[i], 1 / pivot);

      // Subtrai múltiplos da linha i de outras linhas para tornar todos os outros elementos na coluna i igual a zero
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = -clonedMatrix[j][i];
          clonedMatrix[j] = addScaledRow(
            clonedMatrix[j],
            clonedMatrix[i],
            factor,
          );
          identityMatrix[j] = addScaledRow(
            identityMatrix[j],
            identityMatrix[i],
            factor,
          );
        }
      }
    }

    return identityMatrix;
  }
}
