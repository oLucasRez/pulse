import { Result } from '@domain/models';

import { InvalidHTMLError } from '@domain/errors';

import { isHTMLValid, uuid } from '@utils';

import { ID } from '@types';

/**
 * It's a structure that allows building rich texts, with bold, italic, and
 * underlined texts, etc.
 *
 * @properties
 * - `id`: Instance ID
 * - `content`: The content of the RichText
 */
export class RichText {
  public static create(
    props: RichText.CreateProps,
  ): Result<RichText, RichText.Errors> {
    const { id = uuid(), content } = props;

    if (!isHTMLValid(content)) return Result.reject(new InvalidHTMLError());

    return Result.resolve(new RichText({ id, content }));
  }

  public update(
    props: RichText.UpdateProps,
  ): Result<RichText, RichText.Errors> {
    if ('content' in props) {
      if (!isHTMLValid(props.content))
        return Result.reject(new InvalidHTMLError());

      this._content = props.content;
    }

    return Result.resolve(this);
  }

  private constructor(props: RichText.Props) {
    this.id = props.id;
    this._content = props.content;
  }

  public readonly id: ID;

  private _content: string;
  public get content() {
    return this._content;
  }
}

export namespace RichText {
  export type Errors = InvalidHTMLError;

  export type CreateProps = {
    id?: ID;
    content: string;
  };

  export type UpdateProps = {
    content?: string;
  };

  export type Props = {
    id: ID;
    content: string;
  };
}
