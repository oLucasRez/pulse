import { CentralFactModel } from '@domain/models';
import { GetCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';

export class DAOGetCentralFactUsecase implements GetCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;

  public constructor(deps: DAOGetCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
  }

  public async execute(): Promise<CentralFactModel | null> {
    const [centralFactDTO] = await this.centralFactDAO.read();

    return centralFactDTO ? CentralFactHydrator.hydrate(centralFactDTO) : null;
  }
}

export namespace DAOGetCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
  };
}
