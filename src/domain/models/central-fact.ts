import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { nowISO, uuid } from '@utils';

import { ID } from '@types';

/**
 * The Central Fact is a crucial scene representing the latest point in the
 * story. Inserting your Element connects it to others, but established
 * information cannot be changed. The scene can be reinterpreted, but logic and
 * context are not necessary. Explanations can be given during the game.
 *
 * @properties
 * - `id`: Instance ID
 * - `richTextID`: The text that describes the Central Fact
 * - `centralPulseID`: The pulse related to the Central Fact
 * - `createdAt`: When was it created
 * - `updatedAt`: When was the last update
 */
export class CentralFact {
  public static create(
    props: CentralFact.CreateProps,
  ): Result<CentralFact, CentralFact.CreateErrors> {
    const {
      id = uuid(),
      richTextID,
      centralPulseID,
      createdAt = nowISO(),
      updatedAt = createdAt,
    } = props;

    if (!richTextID)
      return Result.reject(
        new MissingForeignKeyError('Rich Text ID foreign key is missing'),
      );

    if (!centralPulseID)
      return Result.reject(
        new MissingForeignKeyError('Central Pulse ID foreign key is missing'),
      );

    return Result.resolve(
      new CentralFact({ id, richTextID, centralPulseID, createdAt, updatedAt }),
    );
  }

  private constructor(props: CentralFact.Props) {
    this._id = props.id;

    this._richTextID = props.richTextID;
    this._centralPulseID = props.centralPulseID;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: ID;
  public get id() {
    return this._id;
  }

  private _richTextID: ID;
  public get richTextID() {
    return this._richTextID;
  }

  private _centralPulseID: ID;
  public get centralPulseID() {
    return this._centralPulseID;
  }

  private _createdAt: string;
  public get createdAt() {
    return this._createdAt;
  }

  private _updatedAt: string;
  public get updatedAt() {
    return this._updatedAt;
  }
}

export namespace CentralFact {
  export type CreateErrors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;

    richTextID: ID;
    centralPulseID: ID;

    createdAt?: string;
    updatedAt?: string;
  };

  export type Props = {
    id: ID;

    richTextID: ID;
    centralPulseID: ID;

    createdAt: string;
    updatedAt: string;
  };
}
