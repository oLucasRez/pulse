import { uuid } from '@utils';

import { vector } from '@types';

type ConstructorProps = {
  id?: string;
  position?: vector | null;
};

export class Landmark {
  public readonly id: string;

  protected _position: vector | null;
  public get position(): vector | null {
    return this._position;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), position = null } = props;

    this.id = id;
    this._position = position;
  }
}
