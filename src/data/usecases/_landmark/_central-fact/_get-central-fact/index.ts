import { CentralFactModel } from '@domain/models';
import {
  IGetCentralFactUsecase,
  IGetCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { ICentralFactHydrator } from '@data/hydration';

export class GetCentralFactUsecase implements IGetCentralFactUsecase {
  private readonly getCentralPulse: IGetCentralPulseUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly centralFactHydrator: ICentralFactHydrator;
  public constructor({
    getCentralPulse,
    centralFactDAO,
    centralFactHydrator,
  }: Deps) {
    this.getCentralPulse = getCentralPulse;
    this.centralFactDAO = centralFactDAO;
    this.centralFactHydrator = centralFactHydrator;
  }

  public async execute(): Promise<CentralFactModel | null> {
    const centralPulse = await this.getCentralPulse.execute();

    if (!centralPulse?.landmarkID) return null;

    const dto = await this.centralFactDAO.getByID(centralPulse.landmarkID);

    const centralFact = dto
      ? await this.centralFactHydrator.hydrate(dto)
      : null;

    return centralFact;
  }
}

type Deps = {
  getCentralPulse: IGetCentralPulseUsecase;
  centralFactDAO: ICentralFactDAO;
  centralFactHydrator: ICentralFactHydrator;
};
