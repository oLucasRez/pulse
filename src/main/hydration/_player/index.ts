import { PlayerModel } from '@domain/models';

import { IDiceDAO, ISubjectDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

import { getOldestSubject } from '../helpers';

export class PlayerHydrator implements IPlayerHydrator {
  public readonly diceDAO: IDiceDAO;
  public readonly subjectDAO: ISubjectDAO;
  public constructor({ diceDAO, subjectDAO }: Deps) {
    this.diceDAO = diceDAO;
    this.subjectDAO = subjectDAO;
  }

  public async hydrate(dto: PlayerModel.DTO): Promise<PlayerModel> {
    const dice = await this.diceDAO.getByOrder(dto.order);
    const oldestSubject = await getOldestSubject(dto.order, {
      subjectDAO: this.subjectDAO,
    });

    return {
      id: dto.id,
      name: dto.name,
      color: dto.color,
      avatar: dto.avatar,
      uid: dto.uid,
      diceID: dice?.id || null,
      subjectID: oldestSubject?.id || null,
      banned: dto.banned,
      order: dto.order,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  subjectDAO: ISubjectDAO;
};
