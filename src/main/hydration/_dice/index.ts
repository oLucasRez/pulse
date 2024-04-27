import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IPlayerDAO, ISubjectDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

import { getOldestSubject } from '../helpers';

export class DiceHydrator implements IDiceHydrator {
  private readonly playerDAO: IPlayerDAO;
  private readonly subjectDAO: ISubjectDAO;
  public constructor({ playerDAO, subjectDAO }: Deps) {
    this.playerDAO = playerDAO;
    this.subjectDAO = subjectDAO;
  }

  public async hydrate(dto: DiceModel.DTO): Promise<DiceModel> {
    const owner = await this.playerDAO.getByOrder(dto.order);

    const oldestSubject = await getOldestSubject(dto.order, {
      subjectDAO: this.subjectDAO,
    });

    return {
      id: dto.id,
      sides: dto.sides,
      value: dto.value,
      ownerID: owner?.id ?? null,
      order: dto.order,
      position: dto.position
        ? Vector.fromJSON(dto.position)
        : oldestSubject?.position
        ? Vector.fromJSON(oldestSubject.position)
        : null,
      color: owner?.color ?? null,
      overloadCount: dto.overloadCount,
      overloaded: dto.overloaded,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  subjectDAO: ISubjectDAO;
};
