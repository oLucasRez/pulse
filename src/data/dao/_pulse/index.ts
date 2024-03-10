import { Vector } from '@domain/utils';

import { ModelDAO } from '..';

export namespace PulseDAO {
  export type BaseDTO = {
    origin: Vector.JSON;
    gap: number;
    amount: number;
    landmarkID: string;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
}

export * from './_central-pulse';
