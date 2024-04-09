import { Model, QuestionModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IQuestionDAO {
  getAll(): Promise<QuestionModel.DTO[]>;
  getByID(id: string): Promise<QuestionModel.DTO | null>;
  create(payload: IQuestionDAO.CreatePayload): Promise<QuestionModel.DTO>;
  update(
    id: string,
    payload: IQuestionDAO.UpdatePayload,
  ): Promise<QuestionModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: QuestionModel.DTO[]) => void): Promise<() => void>;
}

export namespace IQuestionDAO {
  type BaseDTO = Omit<QuestionModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
