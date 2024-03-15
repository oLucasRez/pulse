import { CentralFactModel } from '@domain/models';
import { CreateCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { CreateCentralFactObserver } from '@data/observers';

export class DAOCreateCentralFactUsecase implements CreateCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;
  private readonly createCentralFactPublisher: CreateCentralFactObserver.Publisher;

  public constructor(deps: DAOCreateCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
    this.createCentralFactPublisher = deps.createCentralFactPublisher;
  }

  public async execute(): Promise<CentralFactModel> {
    const dto = await this.centralFactDAO.create({
      position: { x: 0, y: 0 },
      description: '',
    });

    const centralFact = CentralFactHydrator.hydrate(dto);

    this.createCentralFactPublisher.notifyCreateCentralFact(centralFact);

    return centralFact;
  }
}

export namespace DAOCreateCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
    createCentralFactPublisher: CreateCentralFactObserver.Publisher;
  };
}
