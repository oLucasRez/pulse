import { Model } from '../model';

type ConstructorProps = {
  id?: string;
  name: string;
};

export class User extends Model {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor(props: ConstructorProps) {
    const { id, name } = props;

    super({ id });

    this._name = name;
  }
}
