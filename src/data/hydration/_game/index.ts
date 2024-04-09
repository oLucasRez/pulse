import { GameModel, Model } from '@domain/models';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static hydrate(dto: GameModel.DTO): GameModel {
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
        state: dto.state,
        centralPulseID: dto.centralPulseID,
        roundID: dto.roundID,
        lightSpotRoundID: dto.lightSpotRoundID,
      },
    );

    return game;
  }
}
