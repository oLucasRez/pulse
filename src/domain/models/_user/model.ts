import { Model } from '../model';

export class User extends Model {
  private name: string;

  protected constructor(props: User.NewProps) {
    const { name, ...modelProps } = props;

    super(modelProps);

    this.name = name;
  }
  public static create(props: User.CreateProps): User {
    return new User(props);
  }
  public static recreate(props: User.RecreateProps): User {
    return new User(props);
  }

  public getName(): User['name'] {
    return this.name;
  }
}
// ============================================================================
export namespace User {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    name: User['name'];
  };

  export type RecreateProps = Model.RecreateProps & Required<CreateProps>;
}
