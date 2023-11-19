import { vector } from '@types';

import { Model } from '../model';

export class Landmark extends Model {
  protected position: vector | null;

  protected constructor(props: Landmark.NewProps) {
    const { position = null, ...modelProps } = props;

    super({ ...modelProps });

    this.position = position;
  }

  public getPosition(): Landmark['position'] {
    return this.position;
  }
}

export namespace Landmark {
  export type NewProps = Model.NewProps & {
    position?: Landmark['position'];
  };
}
