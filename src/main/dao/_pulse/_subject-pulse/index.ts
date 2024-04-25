import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectPulseModel } from '@domain/models';

import { ISubjectPulseDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class SubjectPulseDAO implements ISubjectPulseDAO {
  private currentGameID: string | null;
  private subjectPulsesByID: Map<string, SubjectPulseModel.DTO>;
  private subjectPulsesByLandmarkID: Map<string, SubjectPulseModel.DTO[]>;

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
    this.subjectPulsesByID = new Map();
    this.subjectPulsesByLandmarkID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access subject-pulses without current-game' },
      });

    return `games/${this.currentGameID}/subjectPulses`;
  }

  private fillCache(subjectPulses: SubjectPulseModel.DTO[]): void {
    this.subjectPulsesByID.clear();
    this.subjectPulsesByLandmarkID.clear();
    subjectPulses.map((subjectPulse) => {
      this.subjectPulsesByID.set(subjectPulse.id, subjectPulse);
      if (this.subjectPulsesByLandmarkID.has(subjectPulse.landmarkID))
        this.subjectPulsesByLandmarkID
          .get(subjectPulse.landmarkID)
          ?.push(subjectPulse);
      else
        this.subjectPulsesByLandmarkID.set(subjectPulse.landmarkID, [
          subjectPulse,
        ]);
    });
  }

  private async fetchSubjectPulses(): Promise<void> {
    await Asyncleton.run('SubjectPulseDAO.fetchSubjectPulses', async () => {
      const { uid } = await this.sessionGetter.getSession();
      if (!uid)
        throw new ForbiddenError({
          metadata: { tried: 'access subject-pulses without session' },
        });

      const user = await this.userDAO.getByUID(uid);
      if (!user)
        throw new NotFoundError({
          metadata: { entity: 'User', prop: 'uid', value: uid },
        });
      if (!user.currentGameID)
        throw new ForbiddenError({
          metadata: { tried: 'access subject-pulses without current-game' },
        });

      if (user.currentGameID === this.currentGameID) return;

      this.currentGameID = user.currentGameID;

      const table = await this.getTable();

      const subjectPulses = await this.database.select<SubjectPulseModel.DTO>(
        table,
      );

      this.fillCache(subjectPulses);
    });
  }

  public async getAll(): Promise<SubjectPulseModel.DTO[]> {
    await this.fetchSubjectPulses();

    return Array.from(this.subjectPulsesByID.values());
  }

  public async getByID(id: string): Promise<SubjectPulseModel.DTO | null> {
    await this.fetchSubjectPulses();

    return this.subjectPulsesByID.get(id) ?? null;
  }

  public async getByLandmarkID(
    landmarkID: string,
  ): Promise<SubjectPulseModel.DTO[]> {
    await this.fetchSubjectPulses();

    return this.subjectPulsesByLandmarkID.get(landmarkID) ?? [];
  }

  public async create(
    payload: ISubjectPulseDAO.CreatePayload,
  ): Promise<SubjectPulseModel.DTO> {
    await this.fetchSubjectPulses();

    const table = await this.getTable();

    const subjectPulse = await this.database.insert<SubjectPulseModel.DTO>(
      table,
      payload,
    );

    this.subjectPulsesByID.set(subjectPulse.id, subjectPulse);

    return subjectPulse;
  }

  public async update(
    id: string,
    payload: ISubjectPulseDAO.UpdatePayload,
  ): Promise<SubjectPulseModel.DTO> {
    await this.fetchSubjectPulses();

    const table = await this.getTable();

    const subjectPulse = await this.database.update<SubjectPulseModel.DTO>(
      table,
      id,
      payload,
    );

    this.subjectPulsesByID.set(id, subjectPulse);

    return subjectPulse;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchSubjectPulses();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.subjectPulsesByID.delete(id);
  }

  public async watch(
    callback: (dtos: SubjectPulseModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchSubjectPulses();

    const table = await this.getTable();

    return this.socket.watch<SubjectPulseModel.DTO>(table, (subjectPulses) => {
      this.fillCache(subjectPulses);

      callback(subjectPulses);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
