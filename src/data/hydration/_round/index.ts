import { Model, RoundModel } from '@domain/models';

import { ModelHydrator } from '..';

export class RoundHydrator {
  public static hydrate(dto: RoundModel.DTO): RoundModel {
    const round: RoundModel = Object.assign<
      Model,
      Omit<RoundModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      playerIDs: dto.playerIDs,
      i: dto.i,
      clockwise: dto.clockwise,
      started: dto.started,
      finished: dto.finished,
    });

    return round;
  }
}
