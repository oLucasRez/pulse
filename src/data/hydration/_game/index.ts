import { GameModel, Model } from '@domain/models';

import { GameDAO } from '@data/dao';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static hydrate(dto: GameDAO.DTO): GameModel {
    const game: GameModel = Object.assign<Model, Omit<GameModel, keyof Model>>(
      ModelHydrator.hydrate(dto),
      {
        uid: dto.uid,
        title: dto.title,
        config: {
          maxPlayers: dto.config.maxPlayers,
          withLightSpot: dto.config.withLightSpot,
          dicesMode: dto.config.dicesMode,
        },
        started: dto.started,
        state: dto.state,
        roundID: dto.roundID,
        lightSpotRoundID: dto.lightSpotRoundID,
      },
    );

    return game;
  }
}
