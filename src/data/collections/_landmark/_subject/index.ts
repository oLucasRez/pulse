import { SubjectModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetSubjectUsecase } from '@domain/usecases';

import { makeGetSubjectUsecase } from '@main/factories';

export class SubjectCollection {
  private static instance: SubjectCollection;

  private readonly collection: Record<string, SubjectModel> = {};

  private readonly getSubject: GetSubjectUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getSubject = makeGetSubjectUsecase();
  }

  private static getInstance(): SubjectCollection {
    if (!SubjectCollection.instance)
      SubjectCollection.instance = new SubjectCollection();

    return SubjectCollection.instance;
  }

  public static getCollection(): Record<string, SubjectModel> {
    return SubjectCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<SubjectModel> {
    const instance = SubjectCollection.getInstance();

    let subject: SubjectModel | null = instance.collection[id];

    if (!subject) subject = await instance.getSubject.execute(id);

    if (!subject)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: id },
      });

    SubjectCollection.append(id, subject);

    return subject;
  }

  public static append(id: string, value: SubjectModel): void {
    const collection = SubjectCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}
