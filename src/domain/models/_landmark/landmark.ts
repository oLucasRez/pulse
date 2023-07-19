import { vector } from '@types';

import { Model } from '../model';

type ConstructorProps = {
  id?: string;
  position?: vector | null;
};

export class Landmark extends Model {
  protected _position: vector | null;
  public get position(): vector | null {
    return this._position;
  }

  public constructor(props: ConstructorProps) {
    const { id, position = null } = props;

    super({ id });

    this._position = position;
  }
}
