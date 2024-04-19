import { QuestionModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IQuestionHydrator } from '@data/hydration';

export class QuestionHydrator implements IQuestionHydrator {
  public async hydrate(dto: QuestionModel.DTO): Promise<QuestionModel> {
    return {
      id: dto.id,
      description: dto.description,
      position: Vector.fromJSON(dto.position),
      subjectIDs: dto.subjectIDs,
      authorID: dto.authorID,
      factID: dto.factID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
