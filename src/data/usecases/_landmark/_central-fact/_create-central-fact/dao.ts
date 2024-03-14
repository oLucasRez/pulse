import { CentralFactModel } from '@domain/models';
import { CreateCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';

export class DAOCreateCentralFactUsecase implements CreateCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;

  public constructor(deps: DAOCreateCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
  }

  public async execute(): Promise<CentralFactModel> {
    const centralFactDAO = await this.centralFactDAO.create({
      position: { x: 0, y: 0 },
      description: '',
    });

    return CentralFactHydrator.hydrate(centralFactDAO);
  }
}

export namespace DAOCreateCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
  };
}
