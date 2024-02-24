import { SubjectModel } from '@domain/models';

export class SubjectCollection {
  private static instance: SubjectCollection;

  private readonly collection: Record<string, SubjectModel> = {};

  private constructor() {}

  private static getInstance(): SubjectCollection {
    if (!SubjectCollection.instance)
      SubjectCollection.instance = new SubjectCollection();

    return SubjectCollection.instance;
  }

  public static getCollection(): Record<string, SubjectModel> {
    return SubjectCollection.getInstance().collection;
  }

  public static get(id: string): SubjectModel | undefined {
    return SubjectCollection.getInstance().collection[id];
  }
}
