import { ForbiddenError, NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';

import { IQuestionDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

export class QuestionDAO implements IQuestionDAO {
  private currentGameID: string | null;
  private questionsByID: Map<string, QuestionModel.DTO>;

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
    this.questionsByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access questions without current-game' },
      });

    return `games/${this.currentGameID}/questions`;
  }

  private fillCache(questions: QuestionModel.DTO[]): void {
    this.questionsByID.clear();
    questions.map((question) => this.questionsByID.set(question.id, question));
  }

  private async fetchQuestions(): Promise<void> {
    const { uid } = await this.sessionGetter.getSession();
    if (!uid)
      throw new ForbiddenError({
        metadata: { tried: 'access questions without session' },
      });

    const user = await this.userDAO.getByUID(uid);
    if (!user)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });
    if (!user.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access questions without current-game' },
      });

    if (user.currentGameID === this.currentGameID) return;

    this.currentGameID = user.currentGameID;

    const table = await this.getTable();

    const questions = await this.database.select<QuestionModel.DTO>(table);

    this.fillCache(questions);
  }

  public async getAll(): Promise<QuestionModel.DTO[]> {
    await this.fetchQuestions();

    return Array.from(this.questionsByID.values());
  }

  public async getByID(id: string): Promise<QuestionModel.DTO | null> {
    await this.fetchQuestions();

    return this.questionsByID.get(id) ?? null;
  }

  public async create(
    payload: IQuestionDAO.CreatePayload,
  ): Promise<QuestionModel.DTO> {
    await this.fetchQuestions();

    const table = await this.getTable();

    const question = await this.database.insert<QuestionModel.DTO>(
      table,
      payload,
    );

    this.questionsByID.set(question.id, question);

    return question;
  }

  public async update(
    id: string,
    payload: IQuestionDAO.UpdatePayload,
  ): Promise<QuestionModel.DTO> {
    await this.fetchQuestions();

    const table = await this.getTable();

    const question = await this.database.update<QuestionModel.DTO>(
      table,
      id,
      payload,
    );

    this.questionsByID.set(id, question);

    return question;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchQuestions();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.questionsByID.delete(id);
  }

  public async watch(
    callback: (dtos: QuestionModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchQuestions();

    const table = await this.getTable();

    return this.socket.watch<QuestionModel.DTO>(table, (questions) => {
      this.fillCache(questions);

      callback(questions);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
