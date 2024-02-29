import { Model, PlayerModel } from '@domain/models';

import {
  DiceCollection,
  PlayerCollection,
  SubjectCollection,
} from '@data/collections';

import { PlayerCRUD } from '@data/cruds';

import { ModelHydrator } from '..';

export class PlayerHydrator {
  public static async hydrate(dto: PlayerCRUD.DTO): Promise<PlayerModel> {
    const player: PlayerModel = Object.assign<
      Model,
      Omit<PlayerModel, keyof Model>
    >(await ModelHydrator.hydrate(dto), {
      name: dto.name,
      color: dto.color,
      avatar: dto.avatar,
      uid: dto.uid,
      dice: dto.diceID ? await DiceCollection.get(dto.diceID) : null,
      subject: dto.subjectID
        ? await SubjectCollection.get(dto.subjectID)
        : null,
      banned: dto.banned,
    });

    PlayerCollection.append(dto.id, player);

    return player;
  }
}
