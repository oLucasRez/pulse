import { Vector } from '@domain/utils';

import { ModelCRUD } from '..';

export namespace PulseCRUD {
  export type BaseDTO = {
    origin: Vector.JSON;
    gap: number;
    amount: number;
    landmarkID: string;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
}

export * from './_central-pulse';