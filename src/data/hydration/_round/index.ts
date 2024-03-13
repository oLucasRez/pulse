import { Model, RoundModel } from '@domain/models';

import { RoundDAO } from '@data/dao';

import { ModelHydrator } from '..';

export class RoundHydrator {
  public static hydrate(dto: RoundDAO.DTO): RoundModel {
    const round: RoundModel = Object.assign<
      Model,
      Omit<RoundModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      playerIDs: dto.playerIDs,
      i: dto.i,
      clockwise: dto.clockwise,
    });

    return round;
  }
}
