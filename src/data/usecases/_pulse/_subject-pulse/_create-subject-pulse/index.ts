import { SubjectPulseModel } from '@domain/models';
import {
  ICreateSubjectPulseUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { ISubjectPulseHydrator } from '@data/hydration';

export class CreateSubjectPulseUsecase implements ICreateSubjectPulseUsecase {
  private readonly nextGameState: INextGameStateUsecase;
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly subjectPulseHydrator: ISubjectPulseHydrator;
  public constructor({
    nextGameState,
    subjectPulseDAO,
    subjectPulseHydrator,
  }: Deps) {
    this.nextGameState = nextGameState;
    this.subjectPulseDAO = subjectPulseDAO;
    this.subjectPulseHydrator = subjectPulseHydrator;
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

    const subjectPulse = await this.subjectPulseHydrator.hydrate(dto);

    await this.nextGameState.execute();

    return subjectPulse;
  }
}

type Deps = {
  nextGameState: INextGameStateUsecase;
  subjectPulseDAO: ISubjectPulseDAO;
  subjectPulseHydrator: ISubjectPulseHydrator;
};
