import { CentralPulseModel } from '@domain/models';
import { GetCentralPulseUsecase } from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';
import { FetchCentralPulseObserver } from '@data/observers';

export class DAOGetCentralPulseUsecase implements GetCentralPulseUsecase {
  private readonly centralPulseDAO: CentralPulseDAO;
  private readonly fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;

  public constructor(deps: DAOGetCentralPulseUsecase.Deps) {
    this.centralPulseDAO = deps.centralPulseDAO;
    this.fetchCentralPulsePublisher = deps.fetchCentralPulsePublisher;
  }

  public async execute(): Promise<CentralPulseModel | null> {
    const [dto] = await this.centralPulseDAO.read();

    const centralPulse = dto ? CentralPulseHydrator.hydrate(dto) : null;

    this.fetchCentralPulsePublisher.notifyFetchCentralPulse(centralPulse);

    return centralPulse;
  }
}

export namespace DAOGetCentralPulseUsecase {
  export type Deps = {
    centralPulseDAO: CentralPulseDAO;
    fetchCentralPulsePublisher: FetchCentralPulseObserver.Publisher;
  };
}
