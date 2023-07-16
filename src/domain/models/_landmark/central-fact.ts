import { uuid } from '@utils';

import { vector } from '@types';

import { Landmark } from './landmark';

type ConstructorProps = {
  id?: string;
  description: string;
  position: vector;
};

export class CentralFact extends Landmark {
  public readonly id: string;

  private _description: string;
  public get description(): string {
    return this._description;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), description, position } = props;

    super({ id, position });

    this.id = id;
    this._description = description;
  }

  public updateDescription(value: string): void {
    this._description += `${value}\n`;
  }

  public toString(): string {
    return `[CentralFact(${this.description})]`;
  }
}
