import { NotFoundError } from '@domain/errors';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { UserCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseUserCRUD implements UserCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseUserCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: UserCRUD.CreatePayload): Promise<UserCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const user = await this.database.insert<UserCRUD.DTO>(table, payload);

    return user;
  }

  public async read(): Promise<UserCRUD.DTO[]>;
  public async read(uid: string): Promise<UserCRUD.DTO | null>;
  public async read(
    uid?: string,
  ): Promise<UserCRUD.DTO | UserCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (uid) {
      const [user] = await Asyncleton.run(`databaseUserCRUD:read:${uid}`, () =>
        this.database.select<UserCRUD.DTO>(table, (user) => user.uid === uid),
      );

      return user || null;
    }

    const users = await Asyncleton.run('databaseUserCRUD:read', () =>
      this.database.select<UserCRUD.DTO>(table),
    );

    return users;
  }

  public async update(
    uid: string,
    payload: UserCRUD.UpdatePayload,
  ): Promise<UserCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const { id } = (await this.read(uid)) ?? {};

    if (!id)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = await this.database.update<UserCRUD.DTO>(table, id, payload);

    return user;
  }

  public async delete(uid: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    const { id } = (await this.read(uid)) ?? {};

    if (!id)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    await this.database.delete(table, id);
  }
}

export namespace DatabaseUserCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
