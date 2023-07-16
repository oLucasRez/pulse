import { uuid } from '@utils';

import { vector } from '@types';

type ConstructorProps = {
  id?: string;
  position: vector;
};

export class Landmark {
  public readonly id: string;

  private _position: vector;
  public get position(): vector {
    return this._position;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), position } = props;

    this.id = id;
    this._position = position;
  }
}
