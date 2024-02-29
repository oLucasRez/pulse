import { GameModel, Model } from '@domain/models';

import { GameCollection, RoundCollection } from '@data/collections';

import { GameCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class GameHydrator {
  public static async hydrate(dto: GameCRUD.DTO): Promise<GameModel> {
    const game: GameModel = Object.assign<Model, Omit<GameModel, keyof Model>>(
      await ModelHydrator.hydrate(dto),
      {
        uid: dto.uid,
        title: dto.title,
        config: {
          maxPlayers: dto.config.maxPlayers,
          withLightspot: dto.config.withLightspot,
          dicesMode: dto.config.dicesMode,
        },
        started: dto.started,
        state: dto.state,
        round: dto.roundID ? RoundCollection.get(dto.roundID) : null,
        lightspotRound: dto.lightspotRoundID
          ? RoundCollection.get(dto.lightspotRoundID)
          : null,
      },
    );

    GameCollection.append(dto.id, game);

    return game;
  }
}
