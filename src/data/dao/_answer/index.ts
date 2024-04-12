import { AnswerModel, Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface IAnswerDAO {
  getAll(): Promise<AnswerModel.DTO[]>;
  getByID(id: string): Promise<AnswerModel.DTO | null>;
  getByQuestionID(questionID: string): Promise<AnswerModel.DTO[]>;
  create(payload: IAnswerDAO.CreatePayload): Promise<AnswerModel.DTO>;
  update(
    id: string,
    payload: IAnswerDAO.UpdatePayload,
  ): Promise<AnswerModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: AnswerModel.DTO[]) => void): Promise<() => void>;
}

export namespace IAnswerDAO {
  type BaseDTO = Omit<AnswerModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
