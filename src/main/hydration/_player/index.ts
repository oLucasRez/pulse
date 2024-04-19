import { PlayerModel } from '@domain/models';

import { IPlayerHydrator } from '@data/hydration';

export class PlayerHydrator implements IPlayerHydrator {
  public async hydrate(dto: PlayerModel.DTO): Promise<PlayerModel> {
    return {
      id: dto.id,
      name: dto.name,
      color: dto.color,
      avatar: dto.avatar,
      uid: dto.uid,
      diceID: dto.diceID,
      subjectID: dto.subjectID,
      banned: dto.banned,
      order: dto.order,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
