import { ForbiddenError, NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';

import { IAnswerDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class AnswerDAO implements IAnswerDAO {
  private currentGameID: string | null;
  private answersByID: Map<string, AnswerModel.DTO>;
  private answersByQuestionID: Map<string, AnswerModel.DTO[]>;

  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly userDAO: IUserDAO;
  private readonly sessionGetter: SessionGetterProtocol;

  public constructor({ database, socket, userDAO, sessionGetter }: Deps) {
    this.database = database;
    this.socket = socket;
    this.userDAO = userDAO;
    this.sessionGetter = sessionGetter;

    this.currentGameID = null;
    this.answersByID = new Map();
    this.answersByQuestionID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access answers without current-game' },
      });

    return `games/${this.currentGameID}/answers`;
  }

  private fillCache(answers: AnswerModel.DTO[]): void {
    this.answersByID.clear();
    this.answersByQuestionID.clear();
    answers.map((answer) => {
      this.answersByID.set(answer.id, answer);
      if (this.answersByQuestionID.has(answer.questionID))
        this.answersByQuestionID.get(answer.questionID)?.push(answer);
      else this.answersByQuestionID.set(answer.questionID, [answer]);
    });
  }

  private async fetchAnswers(): Promise<void> {
    await Asyncleton.run('AnswerDAO.fetchAnswers', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access answers without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access answers without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const answers = await this.database.select<AnswerModel.DTO>(table);

      this.fillCache(answers);
    });
  }

  public async getAll(): Promise<AnswerModel.DTO[]> {
    await this.fetchAnswers();

    return Array.from(this.answersByID.values());
  }

  public async getByID(id: string): Promise<AnswerModel.DTO | null> {
    await this.fetchAnswers();

    return this.answersByID.get(id) ?? null;
  }

  public async getByQuestionID(questionID: string): Promise<AnswerModel.DTO[]> {
    await this.fetchAnswers();

    return this.answersByQuestionID.get(questionID) ?? [];
  }

  public async create(
    payload: IAnswerDAO.CreatePayload,
  ): Promise<AnswerModel.DTO> {
    await this.fetchAnswers();

    const table = await this.getTable();

    const answer = await this.database.insert<AnswerModel.DTO>(table, payload);

    this.answersByID.set(answer.id, answer);

    return answer;
  }

  public async update(
    id: string,
    payload: IAnswerDAO.UpdatePayload,
  ): Promise<AnswerModel.DTO> {
    await this.fetchAnswers();

    const table = await this.getTable();

    const answer = await this.database.update<AnswerModel.DTO>(
      table,
      id,
      payload,
    );

    this.answersByID.set(id, answer);

    return answer;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchAnswers();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.answersByID.delete(id);
  }

  public async watch(
    callback: (dtos: AnswerModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchAnswers();

    const table = await this.getTable();

    return this.socket.watch<AnswerModel.DTO>(table, (answers) => {
      this.fillCache(answers);

      callback(answers);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
