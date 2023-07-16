import { uuid } from '@utils';

type ConstructorProps = {
  id?: string;
  name: string;
};

export class User {
  public readonly id: string;

  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), name } = props;

    this.id = id;
    this._name = name;
  }
}
