import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';

import { IUserDAO } from '@data/dao';
import { DatabaseProtocol } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class UserDAO implements IUserDAO {
  private user: UserModel.DTO | null;

  private readonly database: DatabaseProtocol;

  public constructor({ database }: Deps) {
    this.database = database;

    this.user = null;
  }

  private async fetchUser(uid: string): Promise<void> {
    await Asyncleton.run('UserDAO.fetchUsers', async () => {
      if (this.user && this.user.uid === uid) return;

      const users = await this.database.select<UserModel.DTO>('users');

      this.user = users.find((user) => user.uid === uid) ?? null;
    });
  }

  public async getByUID(uid: string): Promise<UserModel.DTO | null> {
    await this.fetchUser(uid);

    return this.user;
  }

  public async create(payload: IUserDAO.CreatePayload): Promise<UserModel.DTO> {
    const user = await this.database.insert<UserModel.DTO>('users', payload);

    this.user = user;

    return user;
  }

  public async update(
    uid: string,
    payload: IUserDAO.UpdatePayload,
  ): Promise<UserModel.DTO> {
    const { id } = (await this.getByUID(uid)) ?? {};

    if (!id)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = await this.database.update<UserModel.DTO>(
      'users',
      id,
      payload,
    );

    this.user = user;

    return user;
  }

  public async delete(uid: string): Promise<void> {
    const { id } = (await this.getByUID(uid)) ?? {};

    if (!id)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    await this.database.delete('users', id);

    this.user = null;
  }
}

type Deps = {
  database: DatabaseProtocol;
};
