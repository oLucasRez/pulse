import { Vector } from '@domain/utils';

import { ModelCRUD } from '..';

export interface DiceCRUD {
  create(payload: DiceCRUD.CreatePayload): Promise<DiceCRUD.DTO>;
  read(): Promise<DiceCRUD.DTO[]>;
  read(id: string): Promise<DiceCRUD.DTO | null>;
  update(id: string, payload: DiceCRUD.UpdatePayload): Promise<DiceCRUD.DTO>;
  delete(id: string): Promise<void>;
}

export namespace DiceCRUD {
  export type DTO = ModelCRUD.DTO & {
    sides: number;
    value: number | null;
    position: Vector.JSON | null;
    ownerID: string | null;
  };

  export type CreatePayload = {
    sides: number;
    value: number | null;
    position: Vector.JSON | null;
    ownerID: string | null;
  };

  export type UpdatePayload = {
    sides?: number;
    value?: number | null;
    position?: Vector.JSON | null;
    ownerID?: string | null;
  };
}
