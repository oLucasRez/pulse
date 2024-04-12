import { CentralPulseModel } from '@domain/models';
import {
  ICreateCentralFactUsecase,
  ICreateCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { CreateCentralPulseObserver } from '@data/observers';

export class CreateCentralPulseUsecase implements ICreateCentralPulseUsecase {
  private readonly createCentralFact: ICreateCentralFactUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly createCentralPulsePublisher: CreateCentralPulseObserver.Publisher;

  public constructor({
    createCentralFact,
    centralPulseDAO,
    createCentralPulsePublisher,
  }: Deps) {
    this.createCentralFact = createCentralFact;
    this.centralPulseDAO = centralPulseDAO;
    this.createCentralPulsePublisher = createCentralPulsePublisher;
  }

  public async execute(): Promise<CentralPulseModel> {
    const centralFact = await this.createCentralFact.execute();

    const dto = await this.centralPulseDAO.create({
      origin: { x: 0, y: 0 },
      gap: 1,
      amount: 0,
      landmarkID: centralFact.id,
    });

    const centralPulse = CentralPulseHydrator.hydrate(dto);

    this.createCentralPulsePublisher.notifyCreateCentralPulse(centralPulse);

    return centralPulse;
  }
}

type Deps = {
  createCentralFact: ICreateCentralFactUsecase;
  centralPulseDAO: ICentralPulseDAO;
  createCentralPulsePublisher: CreateCentralPulseObserver.Publisher;
};
