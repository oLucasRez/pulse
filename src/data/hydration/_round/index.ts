import { Model, RoundModel } from '@domain/models';

import { PlayerCollection, RoundCollection } from '@data/collections';

import { RoundCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class RoundHydrator {
  public static async hydrate(dto: RoundCRUD.DTO): Promise<RoundModel> {
    const round: RoundModel = Object.assign<
      Model,
      Omit<RoundModel, keyof Model>
    >(await ModelHydrator.hydrate(dto), {
      players: await Promise.all(dto.playerIDs.map(PlayerCollection.get)),
      currentPlayer: dto.currentPlayerID
        ? await PlayerCollection.get(dto.currentPlayerID)
        : null,
    });

    RoundCollection.append(dto.id, round);

    return round;
  }
}
