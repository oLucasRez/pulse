import { CentralPulseModel } from '@domain/models';
import {
  CreateCentralFactUsecase,
  CreateCentralPulseUsecase,
} from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';

export class DAOCreateCentralPulseUsecase implements CreateCentralPulseUsecase {
  private readonly createCentralFact: CreateCentralFactUsecase;
  private readonly centralPulseDAO: CentralPulseDAO;

  public constructor(deps: DAOCreateCentralPulseUsecase.Deps) {
    this.createCentralFact = deps.createCentralFact;
    this.centralPulseDAO = deps.centralPulseDAO;
  }

  public async execute(): Promise<CentralPulseModel> {
    const centralFact = await this.createCentralFact.execute();

    const centralPulseDTO = await this.centralPulseDAO.create({
      origin: { x: 0, y: 0 },
      gap: 1,
      amount: 0,
      landmarkID: centralFact.id,
    });

    return CentralPulseHydrator.hydrate(centralPulseDTO);
  }
}

export namespace DAOCreateCentralPulseUsecase {
  export type Deps = {
    createCentralFact: CreateCentralFactUsecase;
    centralPulseDAO: CentralPulseDAO;
  };
}
