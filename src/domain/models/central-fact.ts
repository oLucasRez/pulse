import { Result } from '@domain/models';

import { InvalidHTMLError, MissingForeignKeyError } from '@domain/errors';

import { isHTMLValid, uuid } from '@utils';

import { ID } from '@types';

/**
 * The Central Fact is a crucial scene representing the latest point in the
 * story. Inserting your Element connects it to others, but established
 * information cannot be changed. The scene can be reinterpreted, but logic and
 * context are not necessary. Explanations can be given during the game.
 *
 * @properties
 * - `id`: Instance ID
 * - `html`: The content of Central Fact
 */
export class CentralFact {
  public static create(
    props: CentralFact.CreateProps,
  ): Result<CentralFact, CentralFact.Errors> {
    const { id = uuid(), html } = props;

    if (!isHTMLValid(html)) return Result.reject(new InvalidHTMLError());

    return Result.resolve(new CentralFact({ id, html }));
  }

  public update(
    props: CentralFact.UpdateProps,
  ): Result<CentralFact, CentralFact.Errors> {
    if ('html' in props) {
      if (!isHTMLValid(props.html))
        return Result.reject(new InvalidHTMLError());

      this._html = props.html;
    }

    return Result.resolve(this);
  }

  private constructor(props: CentralFact.Props) {
    this.id = props.id;
    this._html = props.html;
  }

  public readonly id: ID;

  private _html: string;
  public get html() {
    return this._html;
  }
}

export namespace CentralFact {
  export type Errors = InvalidHTMLError | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    html: string;
  };

  export type UpdateProps = {
    html?: string;
  };

  export type Props = {
    id: ID;
    html: string;
  };
}
