import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IPlayerDAO, ISubjectDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class DiceHydrator implements IDiceHydrator {
  private readonly playerDAO: IPlayerDAO;
  private readonly subjectDAO: ISubjectDAO;
  public constructor({ playerDAO, subjectDAO }: Deps) {
    this.playerDAO = playerDAO;
    this.subjectDAO = subjectDAO;
  }

  public async hydrate(dto: DiceModel.DTO): Promise<DiceModel> {
    const owner = dto.ownerID
      ? await this.playerDAO.getByID(dto.ownerID)
      : null;
    const subject = owner?.subjectID
      ? await this.subjectDAO.getByID(owner.subjectID)
      : null;

    return {
      id: dto.id,
      sides: dto.sides,
      value: dto.value,
      ownerID: dto.ownerID,
      position: dto.position
        ? Vector.fromJSON(dto.position)
        : subject?.position
        ? Vector.fromJSON(subject.position)
        : null,
      color: owner?.color ?? null,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  subjectDAO: ISubjectDAO;
};
