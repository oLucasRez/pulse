import { LandmarkModel, QuestionModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkHydrator } from '..';

export class QuestionHydrator {
  public static hydrate(dto: QuestionModel.DTO): QuestionModel {
    const question: QuestionModel = Object.assign<
      LandmarkModel,
      Omit<QuestionModel, keyof LandmarkModel> & Pick<QuestionModel, 'position'>
    >(LandmarkHydrator.hydrate(dto), {
      position: Vector.fromJSON(dto.position),
      subjectIDs: dto.subjectIDs,
      authorID: dto.authorID,
      factID: dto.factID,
    });

    return question;
  }
}
