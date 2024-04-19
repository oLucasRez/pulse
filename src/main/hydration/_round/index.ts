import { RoundModel } from '@domain/models';

import { IRoundHydrator } from '@data/hydration';

export class RoundHydrator implements IRoundHydrator {
  public async hydrate(dto: RoundModel.DTO): Promise<RoundModel> {
    return {
      id: dto.id,
      i: dto.i,
      clockwise: dto.clockwise,
      playerIDs: dto.playerIDs,
      started: dto.started,
      finished: dto.finished,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
