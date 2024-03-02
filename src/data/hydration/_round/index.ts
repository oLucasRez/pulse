import { Model, RoundModel } from '@domain/models';

import { RoundCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class RoundHydrator {
  public static hydrate(dto: RoundCRUD.DTO): RoundModel {
    const round: RoundModel = Object.assign<
      Model,
      Omit<RoundModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      playerIDs: dto.playerIDs,
      currentPlayerID: dto.currentPlayerID,
    });

    return round;
  }
}
