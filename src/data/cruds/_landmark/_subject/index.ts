import { Color } from '@domain/enums';

import { DeepPartial } from '@domain/types';

import { LandmarkCRUD } from '..';

export interface SubjectCRUD {
  create(payload: SubjectCRUD.CreatePayload): Promise<SubjectCRUD.DTO>;
  read(): Promise<SubjectCRUD.DTO[]>;
  read(id: string): Promise<SubjectCRUD.DTO | null>;
  update(
    id: string,
    payload: SubjectCRUD.UpdatePayload,
  ): Promise<SubjectCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace SubjectCRUD {
  type BaseDTO = LandmarkCRUD.BaseDTO & {
    description: string;
    color: Color;
    authorID: string;
    pathIDs: string[];
  };

  export type DTO = LandmarkCRUD.DTO & BaseDTO;
  export type CreatePayload = BaseDTO;
  export type UpdatePayload = DeepPartial<BaseDTO>;
}
