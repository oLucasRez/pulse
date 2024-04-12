import { AnswerModel, Model } from '@domain/models';

import { ModelHydrator } from '..';

export class AnswerHydrator {
  public static hydrate(dto: AnswerModel.DTO): AnswerModel {
    const answer: AnswerModel = Object.assign<
      Model,
      Omit<AnswerModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      description: dto.description,
      questionID: dto.questionID,
      authorID: dto.authorID,
    });

    return answer;
  }
}
