import { Vector } from '@domain/utils';

import { ModelDAO } from '..';

export namespace LandmarkDAO {
  export type BaseDTO = {
    position: Vector.JSON | null;
  };

  export type DTO = ModelDAO.DTO & BaseDTO;
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';
