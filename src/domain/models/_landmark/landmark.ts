import { vector } from '@types';

import { Model } from '../this';

export class Landmark extends Model {
  protected _position: vector | null;
  public get position(): vector | null {
    return this._position;
  }

  public constructor(props: Landmark.NewProps) {
    const { position = null, ...modelProps } = props;

    super({ ...modelProps });

    this._position = position;
  }
}

export namespace Landmark {
  export type NewProps = Model.NewProps & {
    position?: vector | null;
  };
}
