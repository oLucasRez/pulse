import { CentralPulseModel } from '@domain/models';
import {
  CreateCentralFactUsecase,
  CreateCentralPulseUsecase,
} from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { CreateCentralPulseObserver } from '@data/observers';

export class DAOCreateCentralPulseUsecase implements CreateCentralPulseUsecase {
  private readonly createCentralFact: CreateCentralFactUsecase;
  private readonly centralPulseDAO: CentralPulseDAO;
  private readonly createCentralPulsePublisher: CreateCentralPulseObserver.Publisher;

  public constructor(deps: DAOCreateCentralPulseUsecase.Deps) {
    this.createCentralFact = deps.createCentralFact;
    this.centralPulseDAO = deps.centralPulseDAO;
    this.createCentralPulsePublisher = deps.createCentralPulsePublisher;
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

export namespace DAOCreateCentralPulseUsecase {
  export type Deps = {
    createCentralFact: CreateCentralFactUsecase;
    centralPulseDAO: CentralPulseDAO;
    createCentralPulsePublisher: CreateCentralPulseObserver.Publisher;
  };
}
