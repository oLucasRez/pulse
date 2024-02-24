import { UserModel } from '@domain/models';

export class UserCollection {
  private static instance: UserCollection;

  private readonly collection: Record<string, UserModel> = {};

  private constructor() {}

  private static getInstance(): UserCollection {
    if (!UserCollection.instance)
      UserCollection.instance = new UserCollection();

    return UserCollection.instance;
  }

  public static getCollection(): Record<string, UserModel> {
    return UserCollection.getInstance().collection;
  }

  public static get(uid: string): UserModel | undefined {
    return UserCollection.getInstance().collection[uid];
  }
}
