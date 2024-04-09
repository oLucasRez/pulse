import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';

import { ISubjectDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

export class SubjectDAO implements ISubjectDAO {
  private currentGameID: string | null;
  private subjectsByID: Map<string, SubjectModel.DTO>;

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
    this.subjectsByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access subjects without current-game' },
      });

    return `games/${this.currentGameID}/subjects`;
  }

  private fillCache(subjects: SubjectModel.DTO[]): void {
    this.subjectsByID.clear();
    subjects.map((subject) => this.subjectsByID.set(subject.id, subject));
  }

  private async fetchSubjects(): Promise<void> {
    const { uid } = await this.sessionGetter.getSession();
    if (!uid)
      throw new ForbiddenError({
        metadata: { tried: 'access subjects without session' },
      });

    const user = await this.userDAO.getByUID(uid);
    if (!user)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });
    if (!user.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access subjects without current-game' },
      });

    if (user.currentGameID === this.currentGameID) return;

    this.currentGameID = user.currentGameID;

    const table = await this.getTable();

    const subjects = await this.database.select<SubjectModel.DTO>(table);

    this.fillCache(subjects);
  }

  public async getAll(): Promise<SubjectModel.DTO[]> {
    await this.fetchSubjects();

    return Array.from(this.subjectsByID.values());
  }

  public async getByID(id: string): Promise<SubjectModel.DTO | null> {
    await this.fetchSubjects();

    return this.subjectsByID.get(id) ?? null;
  }

  public async create(
    payload: ISubjectDAO.CreatePayload,
  ): Promise<SubjectModel.DTO> {
    await this.fetchSubjects();

    const table = await this.getTable();

    const subject = await this.database.insert<SubjectModel.DTO>(
      table,
      payload,
    );

    this.subjectsByID.set(subject.id, subject);

    return subject;
  }

  public async update(
    id: string,
    payload: ISubjectDAO.UpdatePayload,
  ): Promise<SubjectModel.DTO> {
    await this.fetchSubjects();

    const table = await this.getTable();

    const subject = await this.database.update<SubjectModel.DTO>(
      table,
      id,
      payload,
    );

    this.subjectsByID.set(id, subject);

    return subject;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchSubjects();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.subjectsByID.delete(id);
  }

  public async watch(
    callback: (dtos: SubjectModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchSubjects();

    const table = await this.getTable();

    return this.socket.watch<SubjectModel.DTO>(table, (subjects) => {
      this.fillCache(subjects);

      callback(subjects);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
