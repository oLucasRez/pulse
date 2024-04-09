import { Model, SubjectModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface ISubjectDAO {
  getAll(): Promise<SubjectModel.DTO[]>;
  getByID(id: string): Promise<SubjectModel.DTO | null>;
  create(payload: ISubjectDAO.CreatePayload): Promise<SubjectModel.DTO>;
  update(
    id: string,
    payload: ISubjectDAO.UpdatePayload,
  ): Promise<SubjectModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: SubjectModel.DTO[]) => void): Promise<() => void>;
}

export namespace ISubjectDAO {
  type BaseDTO = Omit<SubjectModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
