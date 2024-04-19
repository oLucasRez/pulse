import { AnswerModel } from '@domain/models';

import { IAnswerHydrator } from '@data/hydration';

export class AnswerHydrator implements IAnswerHydrator {
  public async hydrate(dto: AnswerModel.DTO): Promise<AnswerModel> {
    return {
      id: dto.id,
      description: dto.description,
      questionID: dto.questionID,
      authorID: dto.authorID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
