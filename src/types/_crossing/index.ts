import { Subject } from '@domain/models';

import { vector } from '..';

export type crossing = {
  scope: Subject[];
  position: vector;

  toDTO(): crossing.DTO;
};

export namespace crossing {
  export type DTO = {
    scope: Subject.DTO[];
    position: vector.DTO;
  };
}
