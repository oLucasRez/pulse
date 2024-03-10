import { NotFoundError } from '@domain/errors';

import { UserDAO } from '@data/dao';
import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseUserDAO implements UserDAO {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseUserDAO.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: UserDAO.CreatePayload): Promise<UserDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const user = await this.database.insert<UserDAO.DTO>(table, payload);

    return user;
  }

  public async read(): Promise<UserDAO.DTO[]>;
  public async read(uid: string): Promise<UserDAO.DTO | null>;
  public async read(uid?: string): Promise<UserDAO.DTO | UserDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (uid) {
      const [user] = await Asyncleton.run(`databaseUserDAO:read:${uid}`, () =>
        this.database.select<UserDAO.DTO>(table, (user) => user.uid === uid),
      );

      return user || null;
    }

    const users = await Asyncleton.run('databaseUserDAO:read', () =>
      this.database.select<UserDAO.DTO>(table),
    );

    return users;
  }

  public async update(
    uid: string,
    payload: UserDAO.UpdatePayload,
  ): Promise<UserDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const { id } = (await this.read(uid)) ?? {};

    if (!id)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = await this.database.update<UserDAO.DTO>(table, id, payload);

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

export namespace DatabaseUserDAO {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
