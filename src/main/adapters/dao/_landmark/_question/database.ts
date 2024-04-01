import { QuestionDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SocketProtocol,
  TableGenerator,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseQuestionDAO implements QuestionDAO {
  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseQuestionDAO.Deps) {
    this.database = deps.database;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: QuestionDAO.CreatePayload,
  ): Promise<QuestionDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const question = await this.database.insert<QuestionDAO.DTO>(
      table,
      payload,
    );

    return question;
  }

  public async read(): Promise<QuestionDAO.DTO[]>;
  public async read(id: string): Promise<QuestionDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<QuestionDAO.DTO | QuestionDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [question] = await Asyncleton.run(
        `databaseQuestionDAO:read:${id}`,
        () =>
          this.database.select<QuestionDAO.DTO>(
            table,
            (question) => question.id === id,
          ),
      );

      return question || null;
    }

    const questions = await Asyncleton.run('databaseQuestionDAO:read', () =>
      this.database.select<QuestionDAO.DTO>(table),
    );

    return questions;
  }

  public async update(
    id: string,
    payload: QuestionDAO.UpdatePayload,
  ): Promise<QuestionDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const question = await this.database.update<QuestionDAO.DTO>(
      table,
      id,
      payload,
    );

    return question;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }

  public async watch(
    callback: (dtos: QuestionDAO.DTO[]) => void,
  ): Promise<() => void> {
    const table = await this.tableGenerator.getTable();

    return this.socket.watch<QuestionDAO.DTO>(table, callback);
  }
}

export namespace DatabaseQuestionDAO {
  export type Deps = {
    database: DatabaseProtocol;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
  };
}
