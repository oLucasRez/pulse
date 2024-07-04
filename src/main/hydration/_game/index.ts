import { GameModel } from '@domain/models';

import { IGameHydrator } from '@data/hydration';

export class GameHydrator implements IGameHydrator {
  public async hydrate(dto: GameModel.DTO): Promise<GameModel> {
    const state = GameModel.STATES.find(
      (state) => state.value === dto.state[0],
    );
    const currentSubStateI =
      (state?.states?.findIndex((state) => state.value === dto.state[1]) || 0) +
      1;

    return {
      id: dto.id,
      uid: dto.uid,
      title: dto.title,
      config: dto.config,
      state: dto.state,
      stateProgress: (currentSubStateI || 1) / (state?.states?.length || 1),
      centralPulseID: dto.centralPulseID,
      roundID: dto.roundID,
      lightSpotRoundID: dto.lightSpotRoundID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
