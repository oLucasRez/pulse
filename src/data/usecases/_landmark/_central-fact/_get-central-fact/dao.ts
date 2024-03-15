import { CentralFactModel } from '@domain/models';
import { GetCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { FetchCentralFactObserver } from '@data/observers';

export class DAOGetCentralFactUsecase implements GetCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;
  private readonly fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;

  public constructor(deps: DAOGetCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
    this.fetchCentralFactPublisher = deps.fetchCentralFactPublisher;
  }

  public async execute(): Promise<CentralFactModel | null> {
    const [dto] = await this.centralFactDAO.read();

    const centralFact = dto ? CentralFactHydrator.hydrate(dto) : null;

    this.fetchCentralFactPublisher.notifyFetchCentralFact(centralFact);

    return centralFact;
  }
}

export namespace DAOGetCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
    fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;
  };
}
