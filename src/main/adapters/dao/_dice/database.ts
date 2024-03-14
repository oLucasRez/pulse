import { DiceDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SocketProtocol,
  TableGenerator,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseDiceDAO implements DiceDAO {
  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseDiceDAO.Deps) {
    this.database = deps.database;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: DiceDAO.CreatePayload): Promise<DiceDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const dice = await this.database.insert<DiceDAO.DTO>(table, payload);

    return dice;
  }

  public async read(): Promise<DiceDAO.DTO[]>;
  public async read(id: string): Promise<DiceDAO.DTO | null>;
  public async read(id?: string): Promise<DiceDAO.DTO | DiceDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [dice] = await Asyncleton.run(`databaseDiceDAO:read:${id}`, () =>
        this.database.select<DiceDAO.DTO>(table, (dice) => dice.id === id),
      );

      return dice || null;
    }

    const dices = await Asyncleton.run('databaseDiceDAO:read', () =>
      this.database.select<DiceDAO.DTO>(table),
    );

    return dices;
  }

  public async update(
    id: string,
    payload: DiceDAO.UpdatePayload,
  ): Promise<DiceDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const dice = await this.database.update<DiceDAO.DTO>(table, id, payload);

    return dice;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }

  public async watch(
    callback: (dtos: DiceDAO.DTO[]) => void,
  ): Promise<() => void> {
    const table = await this.tableGenerator.getTable();

    return this.socket.watch<DiceDAO.DTO>(table, callback);
  }
}

export namespace DatabaseDiceDAO {
  export type Deps = {
    database: DatabaseProtocol;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
  };
}
