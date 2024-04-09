import { Model, SubjectPulseModel } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface ISubjectPulseDAO {
  getAll(): Promise<SubjectPulseModel.DTO[]>;
  getByID(id: string): Promise<SubjectPulseModel.DTO | null>;
  create(
    payload: ISubjectPulseDAO.CreatePayload,
  ): Promise<SubjectPulseModel.DTO>;
  update(
    id: string,
    payload: ISubjectPulseDAO.UpdatePayload,
  ): Promise<SubjectPulseModel.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: SubjectPulseModel.DTO[]) => void): Promise<() => void>;
}

export namespace ISubjectPulseDAO {
  type BaseDTO = Omit<SubjectPulseModel.DTO, keyof Model.DTO>;

  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
