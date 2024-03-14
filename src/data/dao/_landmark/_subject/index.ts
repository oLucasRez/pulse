import { Color } from '@domain/enums';
import { DeepPartial } from '@domain/types';

import { LandmarkDAO } from '..';

export interface SubjectDAO {
  create(payload: SubjectDAO.CreatePayload): Promise<SubjectDAO.DTO>;
  read(): Promise<SubjectDAO.DTO[]>;
  read(id: string): Promise<SubjectDAO.DTO | null>;
  update(
    id: string,
    payload: SubjectDAO.UpdatePayload,
  ): Promise<SubjectDAO.DTO>;
  delete(id: string): Promise<void>;
  watch(callback: (dtos: SubjectDAO.DTO[]) => void): Promise<() => void>;
}

export namespace SubjectDAO {
  type BaseDTO = LandmarkDAO.BaseDTO & {
    description: string;
    color: Color;
    icon: string;
    authorID: string;
    pathIDs: string[];
  };

  export type DTO = LandmarkDAO.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
