import { vector } from '@types';

import { Landmark } from './landmark';

type ConstructorProps = {
  id?: string;
  description: string;
  position: vector;
};

export class CentralFact extends Landmark {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  public constructor(props: ConstructorProps) {
    const { id, description, position } = props;

    super({ id, position });

    this._description = description;
  }

  public updateDescription(value: string): void {
    this._description += `${value}\n`;
  }

  public toString(): string {
    return `\x1b[37m[CentralFact(${this.description})]\x1b[0m`;
  }
}
