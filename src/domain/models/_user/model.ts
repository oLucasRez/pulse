import { Model } from '../model';

export class User extends Model {
  private name: string;

  public constructor(props: User.NewProps) {
    const { name, ...modelProps } = props;

    super({ ...modelProps });

    this.name = name;
  }

  public getName(): User['name'] {
    return this.name;
  }
}
// ============================================================================
export namespace User {
  export type NewProps = Model.NewProps & {
    name: User['name'];
  };
}
