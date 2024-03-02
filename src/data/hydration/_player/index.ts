import { Model, PlayerModel } from '@domain/models';

import { PlayerCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class PlayerHydrator {
  public static hydrate(dto: PlayerCRUD.DTO): PlayerModel {
    const player: PlayerModel = Object.assign<
      Model,
      Omit<PlayerModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      name: dto.name,
      color: dto.color,
      avatar: dto.avatar,
      uid: dto.uid,
      diceID: dto.diceID,
      subjectID: dto.subjectID,
      banned: dto.banned,
    });

    return player;
  }
}
