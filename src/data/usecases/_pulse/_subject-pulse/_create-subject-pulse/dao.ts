import { SubjectPulseModel } from '@domain/models';
import {
  CreateSubjectPulseUsecase,
  NextGameStateUsecase,
} from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { CreateSubjectPulseObserver } from '@data/observers';

export class DAOCreateSubjectPulseUsecase implements CreateSubjectPulseUsecase {
  private readonly nextGameState: NextGameStateUsecase;
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;

  public constructor({
    nextGameState,
    subjectPulseDAO,
    createSubjectPulsePublisher,
  }: DAOCreateSubjectPulseUsecase.Deps) {
    this.nextGameState = nextGameState;
    this.subjectPulseDAO = subjectPulseDAO;
    this.createSubjectPulsePublisher = createSubjectPulsePublisher;
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

    await this.nextGameState.execute();

    return subjectPulse;
  }
}

export namespace DAOCreateSubjectPulseUsecase {
  export type Deps = {
    nextGameState: NextGameStateUsecase;
    subjectPulseDAO: ISubjectPulseDAO;
    createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;
  };
}
