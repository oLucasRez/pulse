import { SubjectPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { IDiceDAO, ISubjectDAO } from '@data/dao';
import { ISubjectPulseHydrator } from '@data/hydration';

export class SubjectPulseHydrator implements ISubjectPulseHydrator {
  private readonly diceDAO: IDiceDAO;
  private readonly subjectDAO: ISubjectDAO;
  public constructor({ diceDAO, subjectDAO }: Deps) {
    this.diceDAO = diceDAO;
    this.subjectDAO = subjectDAO;
  }

  public async hydrate(dto: SubjectPulseModel.DTO): Promise<SubjectPulseModel> {
    const subject = await this.subjectDAO.getByID(dto.landmarkID);
    const dice = subject && (await this.diceDAO.getByOrder(subject.order));

    return {
      id: dto.id,
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      overloaded: dice?.overloaded ?? false,
      landmarkID: dto.landmarkID,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  subjectDAO: ISubjectDAO;
};
