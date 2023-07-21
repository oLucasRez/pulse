import { vector } from '@types';

import { Landmark } from './landmark';

export class CentralFact extends Landmark {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  public constructor(props: CentralFact.ConstructorProps) {
    const { description, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this._description = description;
  }

  public updateDescription(value: string): void {
    this._description += `${value}\n`;
  }

  public toString(): string {
    return `\x1b[37m[CentralFact(${this.description})]\x1b[0m`;
  }
}

export namespace CentralFact {
  export type ConstructorProps = Landmark.ConstructorProps & {
    description: string;
    position: vector;
  };
}
