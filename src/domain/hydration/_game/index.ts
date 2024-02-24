import { GameModel } from '@domain/models';

import { GameCollection, UserCollection } from '@domain/collections';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static hydrate(json: GameModel.JSON): GameModel {
    const userCollection = UserCollection.getCollection();

    const game: GameModel = Object.assign(ModelHydrator.hydrate(json), {
      host: userCollection[json.uid],
      title: json.title,
      config: {
        maxPlayers: json.config.maxPlayers,
        withLightspot: json.config.withLightspot,
        dicesMode: json.config.dicesMode,
      },
      started: json.started,
    });

    const collection = GameCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], game);
    else collection[json.id] = game;

    return game;
  }
}
