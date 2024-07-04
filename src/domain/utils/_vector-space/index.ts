import { Matrix, Vector } from '@domain/utils';

export class VectorSpace {
  private scale: number;
  private _matrix: Matrix = [[]];
  public get matrix(): Matrix {
    return this._matrix;
  }

  public static readonly identity: VectorSpace = new VectorSpace();

  public constructor(props: VectorSpace.Props = {}) {
    const { scale = 1, translate } = props;

    this._matrix = [
      [scale, 0, translate?.x ?? 0],
      [0, scale, translate?.y ?? 0],
      [0, 0, 1],
    ];

    this.scale = scale;
  }

  public mult(vector: Vector): Vector;
  public mult(x: number, y: number): Vector;
  public mult(scalar: number): number;
  public mult(value: Vector | number, y?: number): Vector | number {
    if (typeof value === 'number' && y === undefined) return this.scale * value;

    const v = Matrix.transpose(
      (y !== undefined && typeof value === 'number'
        ? new Vector([value, y])
        : typeof value === 'number'
        ? new Vector([0, 0])
        : value
      ).toMatrix(),
    );

    return Matrix.toVector(Matrix.dot(this._matrix, v));
  }

  public inverse(): VectorSpace {
    const newVectorSpace = new VectorSpace();
    newVectorSpace.scale = this.scale;
    newVectorSpace._matrix = Matrix.inverse(this._matrix);

    return newVectorSpace;
  }
}

export namespace VectorSpace {
  export type Props =
    | {
        translate?: Vector;
        scale?: number;
      }
    | undefined;
}
