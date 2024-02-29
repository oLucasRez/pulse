import { Model, RoundModel } from '@domain/models';

import { PlayerCollection, RoundCollection } from '@data/collections';

import { ModelHydrator } from '..';

export class RoundHydrator {
  public static async hydrate(json: RoundModel.JSON): Promise<RoundModel> {
    const round: RoundModel = Object.assign<
      Model,
      Omit<RoundModel, keyof Model>
    >(ModelHydrator.hydrate(json), {
      players: await Promise.all(json.playerIDs.map(PlayerCollection.get)),
      currentPlayer: json.currentPlayerID
        ? await PlayerCollection.get(json.currentPlayerID)
        : null,
    });

    RoundCollection.append(json.id, round);

    return round;
  }
}
