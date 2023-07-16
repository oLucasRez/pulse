import { uuid } from '@utils';

import { vector } from '@types';

import { Landmark } from './landmark';

type ConstructorProps = {
  id?: string;
  description: string;
  position: vector;
};

export class Question extends Landmark {
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

  public toString(): string {
    const ellipsis = this._description.length > 20 ? '...?' : '';

    return `[Question(${this._description.slice(0, 20)}${ellipsis})]`;
  }
}
