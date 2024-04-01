import { SubjectPulseModel } from '@domain/models';
import { CreateSubjectPulseUsecase } from '@domain/usecases';

import { SubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { CreateSubjectPulseObserver } from '@data/observers';

export class DAOCreateSubjectPulseUsecase implements CreateSubjectPulseUsecase {
  private readonly subjectPulseDAO: SubjectPulseDAO;
  private readonly createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;

  public constructor(deps: DAOCreateSubjectPulseUsecase.Deps) {
    this.subjectPulseDAO = deps.subjectPulseDAO;
    this.createSubjectPulsePublisher = deps.createSubjectPulsePublisher;
  }

  public async execute(
    payload: CreateSubjectPulseUsecase.Payload,
  ): Promise<SubjectPulseModel> {
    const { origin, gap, amount, landmarkID } = payload;

    const dto = await this.subjectPulseDAO.create({
      origin: origin.toJSON(),
      gap,
      amount,
      landmarkID,
    });

    const subjectPulse = SubjectPulseHydrator.hydrate(dto);

    this.createSubjectPulsePublisher.notifyCreateSubjectPulse(subjectPulse);

    return subjectPulse;
  }
}

export namespace DAOCreateSubjectPulseUsecase {
  export type Deps = {
    subjectPulseDAO: SubjectPulseDAO;
    createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;
  };
}
