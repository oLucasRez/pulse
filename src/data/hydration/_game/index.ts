import { GameModel, Model } from '@domain/models';

import { GameCollection, RoundCollection } from '@data/collections';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static async hydrate(json: GameModel.JSON): Promise<GameModel> {
    const game: GameModel = Object.assign<Model, Omit<GameModel, keyof Model>>(
      ModelHydrator.hydrate(json),
      {
        uid: json.uid,
        title: json.title,
        config: {
          maxPlayers: json.config.maxPlayers,
          withLightspot: json.config.withLightspot,
          dicesMode: json.config.dicesMode,
        },
        started: json.started,
        state: json.state,
        round: json.roundID ? RoundCollection.get(json.roundID) : null,
        lightspotRound: json.lightspotRoundID
          ? RoundCollection.get(json.lightspotRoundID)
          : null,
      },
    );

    GameCollection.append(json.id, game);

    return game;
  }
}
