import { Result } from '@domain/models';

import { EmptyStringError } from '@domain/errors';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * It's an account authenticated on the platform.
 *
 * @properties
 * - `id`: Instance ID
 * - `name`: The name of the user
 */
export class User {
  public static create(props: User.CreateProps): Result<User, User.Errors> {
    const { id = uuid(), name } = props;

    if (!name) return Result.reject(new EmptyStringError('Name is empty'));

    return Result.resolve(new User({ id, name }));
  }

  private constructor(props: User.Props) {
    this.id = props.id;
    this.name = props.name;
  }

  public readonly id: ID;

  public readonly name: string;
}

export namespace User {
  export type Errors = EmptyStringError;

  export type CreateProps = {
    id?: ID;
    name: string;
  };

  export type Props = {
    id: ID;
    name: string;
  };
}
