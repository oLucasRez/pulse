import { ForbiddenError, NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';

import { IDiceDAO, IUserDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SessionGetterProtocol,
  SocketProtocol,
} from '@data/protocols';

export class DiceDAO implements IDiceDAO {
  private currentGameID: string | null;
  private dicesByID: Map<string, DiceModel.DTO>;

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
    this.dicesByID = new Map();
  }

  private async getTable(): Promise<string> {
    if (!this.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access dices without current-game' },
      });

    return `games/${this.currentGameID}/dices`;
  }

  private fillCache(dices: DiceModel.DTO[]): void {
    this.dicesByID.clear();
    dices.map((dice) => this.dicesByID.set(dice.id, dice));
  }

  private async fetchDices(): Promise<void> {
    const { uid } = await this.sessionGetter.getSession();
    if (!uid)
      throw new ForbiddenError({
        metadata: { tried: 'access dices without session' },
      });

    const user = await this.userDAO.getByUID(uid);
    if (!user)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });
    if (!user.currentGameID)
      throw new ForbiddenError({
        metadata: { tried: 'access dices without current-game' },
      });

    if (user.currentGameID === this.currentGameID) return;

    this.currentGameID = user.currentGameID;

    const table = await this.getTable();

    const dices = await this.database.select<DiceModel.DTO>(table);

    this.fillCache(dices);
  }

  public async getAll(): Promise<DiceModel.DTO[]> {
    await this.fetchDices();

    return Array.from(this.dicesByID.values());
  }

  public async getByID(id: string): Promise<DiceModel.DTO | null> {
    await this.fetchDices();

    return this.dicesByID.get(id) ?? null;
  }

  public async create(payload: IDiceDAO.CreatePayload): Promise<DiceModel.DTO> {
    await this.fetchDices();

    const table = await this.getTable();

    const dice = await this.database.insert<DiceModel.DTO>(table, payload);

    this.dicesByID.set(dice.id, dice);

    return dice;
  }

  public async update(
    id: string,
    payload: IDiceDAO.UpdatePayload,
  ): Promise<DiceModel.DTO> {
    await this.fetchDices();

    const table = await this.getTable();

    const dice = await this.database.update<DiceModel.DTO>(table, id, payload);

    this.dicesByID.set(id, dice);

    return dice;
  }

  public async delete(id: string): Promise<void> {
    await this.fetchDices();

    const table = await this.getTable();

    await this.database.delete(table, id);

    this.dicesByID.delete(id);
  }

  public async watch(
    callback: (dtos: DiceModel.DTO[]) => void,
  ): Promise<() => void> {
    await this.fetchDices();

    const table = await this.getTable();

    return this.socket.watch<DiceModel.DTO>(table, (dices) => {
      this.fillCache(dices);

      callback(dices);
    });
  }
}

type Deps = {
  database: DatabaseProtocol;
  socket: SocketProtocol;
  userDAO: IUserDAO;
  sessionGetter: SessionGetterProtocol;
};
