import { CentralFactModel } from '@domain/models';
import {
  IGetCentralFactUsecase,
  IGetCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { FetchCentralFactObserver } from '@data/observers';

export class GetCentralFactUsecase implements IGetCentralFactUsecase {
  private readonly getCentralPulse: IGetCentralPulseUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;

  public constructor({
    getCentralPulse,
    centralFactDAO,
    fetchCentralFactPublisher,
  }: Deps) {
    this.getCentralPulse = getCentralPulse;
    this.centralFactDAO = centralFactDAO;
    this.fetchCentralFactPublisher = fetchCentralFactPublisher;
  }

  public async execute(): Promise<CentralFactModel | null> {
    const centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse?.landmarkID) return null;

    const dto = await this.centralFactDAO.getByID(centralPulse.landmarkID);

    const centralFact = dto ? CentralFactHydrator.hydrate(dto) : null;

    this.fetchCentralFactPublisher.notifyFetchCentralFact(centralFact);

    return centralFact;
  }
}

type Deps = {
  getCentralPulse: IGetCentralPulseUsecase;
  centralFactDAO: ICentralFactDAO;
  fetchCentralFactPublisher: FetchCentralFactObserver.Publisher;
};
