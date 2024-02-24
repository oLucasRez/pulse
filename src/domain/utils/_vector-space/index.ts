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

  public transformVector(vector: Vector): Vector {
    const v = Matrix.transpose(vector.toMatrix());

    return Matrix.toVector(Matrix.dot(this._matrix, v));
  }

  public transformScalar(scalar: number): number {
    return this.scale * scalar;
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
