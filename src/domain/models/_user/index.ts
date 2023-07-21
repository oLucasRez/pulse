import { Model } from '../model';

export class User extends Model {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor(props: User.ConstructorProps) {
    const { name, ...modelProps } = props;

    super({ ...modelProps });

    this._name = name;
  }
}

export namespace User {
  export type ConstructorProps = Model.ConstructorProps & {
    name: string;
  };
}
