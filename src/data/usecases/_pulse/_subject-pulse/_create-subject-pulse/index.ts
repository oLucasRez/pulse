import { SubjectPulseModel } from '@domain/models';
import {
  ICreateSubjectPulseUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { CreateSubjectPulseObserver } from '@data/observers';

export class CreateSubjectPulseUsecase implements ICreateSubjectPulseUsecase {
  private readonly nextGameState: INextGameStateUsecase;
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;

  public constructor({
    nextGameState,
    subjectPulseDAO,
    createSubjectPulsePublisher,
  }: Deps) {
    this.nextGameState = nextGameState;
    this.subjectPulseDAO = subjectPulseDAO;
    this.createSubjectPulsePublisher = createSubjectPulsePublisher;
  }

  public async execute(
    payload: ICreateSubjectPulseUsecase.Payload,
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

type Deps = {
  nextGameState: INextGameStateUsecase;
  subjectPulseDAO: ISubjectPulseDAO;
  createSubjectPulsePublisher: CreateSubjectPulseObserver.Publisher;
};
