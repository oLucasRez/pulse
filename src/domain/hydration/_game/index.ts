import { GameModel, Model } from '@domain/models';

import { GameCollection, UserCollection } from '@domain/collections';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static hydrate(json: GameModel.JSON): GameModel {
    const game: GameModel = Object.assign<Model, Omit<GameModel, keyof Model>>(
      ModelHydrator.hydrate(json),
      {
        host: UserCollection.get(json.uid),
        title: json.title,
        config: {
          maxPlayers: json.config.maxPlayers,
          withLightspot: json.config.withLightspot,
          dicesMode: json.config.dicesMode,
        },
        started: json.started,
        state: json.state,
      },
    );

    const collection = GameCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], game);
    else collection[json.id] = game;

    return game;
  }
}
