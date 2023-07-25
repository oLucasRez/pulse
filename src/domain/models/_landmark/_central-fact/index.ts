import { vector } from '@types';

import { Landmark } from '../landmark';

export class CentralFact extends Landmark {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  public constructor(props: CentralFact.NewProps) {
    const { description, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this._description = description;
  }

  public updateDescription(description: string): CentralFact {
    this._description = description;

    return this;
  }

  public toString(): string {
    return `\x1b[37m[CentralFact(${this.description})]\x1b[0m`;
  }
}

export namespace CentralFact {
  export type NewProps = Landmark.NewProps & {
    description: string;
    position: vector;
  };
}
