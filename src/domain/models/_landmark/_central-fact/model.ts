import { vector } from '@types';

import { Landmark } from '../model';

export class CentralFact extends Landmark {
  private description: string;

  public constructor(props: CentralFact.NewProps) {
    const { description, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this.description = description;
  }

  public toDTO(): CentralFact.DTO {
    const landmarkDTO = super.toDTO();

    return Object.freeze({
      ...landmarkDTO,
      description: this.description,
    });
  }

  public updateDescription(description: string): CentralFact {
    this.description = description;

    return this;
  }

  public toString(): string {
    return `\x1b[37m[CentralFact(${this.description})]\x1b[0m`;
  }
}

export namespace CentralFact {
  export type DTO = Landmark.DTO & {
    description: string;
  };

  export type NewProps = Landmark.NewProps & {
    description: string;
    position: vector;
  };
}
