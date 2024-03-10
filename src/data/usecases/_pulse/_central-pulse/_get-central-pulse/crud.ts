import { CentralPulseModel } from '@domain/models';
import { GetCentralPulseUsecase } from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';

export class DAOGetCentralPulseUsecase implements GetCentralPulseUsecase {
  private readonly centralPulseDAO: CentralPulseDAO;

  public constructor(deps: DAOGetCentralPulseUsecase.Deps) {
    this.centralPulseDAO = deps.centralPulseDAO;
  }

  public async execute(): Promise<CentralPulseModel | null> {
    const [centralPulseDTO] = await this.centralPulseDAO.read();

    return centralPulseDTO
      ? CentralPulseHydrator.hydrate(centralPulseDTO)
      : null;
  }
}

export namespace DAOGetCentralPulseUsecase {
  export type Deps = {
    centralPulseDAO: CentralPulseDAO;
  };
}
