import { vector } from '@types';

import { Model } from '../model';

export class Landmark extends Model {
  protected position: vector | null;

  public constructor(props: Landmark.NewProps) {
    const { position = null, ...modelProps } = props;

    super({ ...modelProps });

    this.position = position;
  }

  public toDTO(): Landmark.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      position: this.position?.toDTO() || null,
    });
  }
}

export namespace Landmark {
  export type DTO = Model.DTO & {
    position: vector.DTO | null;
  };

  export type NewProps = Model.NewProps & {
    position?: vector | null;
  };
}
