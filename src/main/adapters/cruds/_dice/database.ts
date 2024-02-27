import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { DiceCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseDiceCRUD implements DiceCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseDiceCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: DiceCRUD.CreatePayload): Promise<DiceCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const dice = await this.database.insert<DiceCRUD.DTO>(table, payload);

    return dice;
  }

  public async read(): Promise<DiceCRUD.DTO[]>;
  public async read(id: string): Promise<DiceCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<DiceCRUD.DTO | DiceCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [dice] = await Asyncleton.run(`databaseDiceCRUD:read:${id}`, () =>
        this.database.select<DiceCRUD.DTO>(table, (dice) => dice.id === id),
      );

      return dice || null;
    }

    const dices = await Asyncleton.run('databaseDiceCRUD:read', () =>
      this.database.select<DiceCRUD.DTO>(table),
    );

    return dices;
  }

  public async update(
    id: string,
    payload: DiceCRUD.UpdatePayload,
  ): Promise<DiceCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const dice = await this.database.update<DiceCRUD.DTO>(table, id, payload);

    return dice;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseDiceCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
