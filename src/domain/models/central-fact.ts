import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

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
 */
export class CentralFact {
  public static create(
    props: CentralFact.CreateProps,
  ): Result<CentralFact, CentralFact.Errors> {
    const { id = uuid(), richTextID, centralPulseID } = props;

    if (!richTextID)
      return Result.reject(
        new MissingForeignKeyError('Rich Text ID foreign key is missing'),
      );

    if (!centralPulseID)
      return Result.reject(
        new MissingForeignKeyError('Central Pulse ID foreign key is missing'),
      );

    return Result.resolve(new CentralFact({ id, richTextID, centralPulseID }));
  }

  private constructor(props: CentralFact.Props) {
    this.id = props.id;
    this.richTextID = props.richTextID;
    this.centralPulseID = props.centralPulseID;
  }

  public readonly id: ID;

  public readonly richTextID: ID;

  public readonly centralPulseID: ID;
}

export namespace CentralFact {
  export type Errors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    richTextID: ID;
    centralPulseID: ID;
  };

  export type Props = {
    id: ID;
    richTextID: ID;
    centralPulseID: ID;
  };
}
