import { DeepPartial } from '@domain/types';
import { Vector } from '@domain/utils';

import { LandmarkDAO } from '..';

export interface QuestionDAO {
  create(payload: QuestionDAO.CreatePayload): Promise<QuestionDAO.DTO>;
  read(): Promise<QuestionDAO.DTO[]>;
  read(id: string): Promise<QuestionDAO.DTO | null>;
  update(
    id: string,
    payload: QuestionDAO.UpdatePayload,
  ): Promise<QuestionDAO.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: QuestionDAO.DTO[]) => void): Promise<() => void>;
}

export namespace QuestionDAO {
  type BaseDTO = LandmarkDAO.BaseDTO & {
    position: Vector.JSON;
    description: string;
    subjectIDs: string[];
    authorID: string;
    answerIDs: string[];
    factID: string | null;
  };

  export type DTO = LandmarkDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
