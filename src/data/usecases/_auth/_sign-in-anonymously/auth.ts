import { faker } from '@faker-js/faker';

import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { SignInAnonymouslyUsecase } from '@domain/usecases';

import {
  AuthAnonymousProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignInAnonymouslyUsecase implements SignInAnonymouslyUsecase {
  private readonly authAnonymous: AuthAnonymousProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignInAnonymouslyUsecase.Deps) {
    this.authAnonymous = deps.authAnonymous;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<UserModel> {
    const uid = await this.authAnonymous.signInAnonymously();

    const table = await this.tableGenerator.getTable();

    let [user] = await this.database.select<UserModel>(
      table,
      (user) => user.uid === uid,
    );

    if (!user) {
      user = await this.database.insert<UserModel>(table, {
        uid,
        name: faker.person.fullName(),
        currentGameID: null,
        // useless
        isAnonymous: true,
        providers: [],
      });
    }

    if (!user)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    return user;
  }
}

export namespace AuthSignInAnonymouslyUsecase {
  export type Deps = {
    authAnonymous: AuthAnonymousProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
