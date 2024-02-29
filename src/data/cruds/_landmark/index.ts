import { Vector } from '@domain/utils';

import { ModelCRUD } from '..';

export namespace LandmarkCRUD {
  export type BaseDTO = {
    position: Vector.JSON | null;
  };

  export type DTO = ModelCRUD.DTO & BaseDTO;
}

export * from './_central-fact';
