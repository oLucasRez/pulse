import { SubjectPulseModel } from '@domain/models';

export class SubjectPulseCollection {
  private static instance: SubjectPulseCollection;

  private readonly collection: Record<string, SubjectPulseModel> = {};

  private constructor() {}

  private static getInstance(): SubjectPulseCollection {
    if (!SubjectPulseCollection.instance)
      SubjectPulseCollection.instance = new SubjectPulseCollection();

    return SubjectPulseCollection.instance;
  }

  public static getCollection(): Record<string, SubjectPulseModel> {
    return SubjectPulseCollection.getInstance().collection;
  }

  public static get(id: string): SubjectPulseModel {
    return SubjectPulseCollection.getInstance().collection[id];
  }

  public static append(id: string, value: SubjectPulseModel): void {
    const collection = SubjectPulseCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}
