import { GameModel } from '@domain/models';

import { IGameHydrator } from '@data/hydration';

export class GameHydrator implements IGameHydrator {
  public async hydrate(dto: GameModel.DTO): Promise<GameModel> {
    return {
      id: dto.id,
      uid: dto.uid,
      title: dto.title,
      config: dto.config,
      state: dto.state,
      centralPulseID: dto.centralPulseID,
      roundID: dto.roundID,
      lightSpotRoundID: dto.lightSpotRoundID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
