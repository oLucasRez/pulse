import { CentralFactModel } from '@domain/models';
import { ICreateCentralFactUsecase } from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { ICentralFactHydrator } from '@data/hydration';

export class CreateCentralFactUsecase implements ICreateCentralFactUsecase {
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly centralFactHydrator: ICentralFactHydrator;
  public constructor({ centralFactDAO, centralFactHydrator }: Deps) {
    this.centralFactDAO = centralFactDAO;
    this.centralFactHydrator = centralFactHydrator;
  }

  public async execute(): Promise<CentralFactModel> {
    const dto = await this.centralFactDAO.create({
      position: { x: 0, y: 0 },
      description: '',
    });

    const centralFact = await this.centralFactHydrator.hydrate(dto);

    return centralFact;
  }
}

type Deps = {
  centralFactDAO: ICentralFactDAO;
  centralFactHydrator: ICentralFactHydrator;
};
