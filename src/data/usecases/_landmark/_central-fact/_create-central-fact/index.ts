import { CentralFactModel } from '@domain/models';
import { ICreateCentralFactUsecase } from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { CreateCentralFactObserver } from '@data/observers';

export class CreateCentralFactUsecase implements ICreateCentralFactUsecase {
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly createCentralFactPublisher: CreateCentralFactObserver.Publisher;

  public constructor({ centralFactDAO, createCentralFactPublisher }: Deps) {
    this.centralFactDAO = centralFactDAO;
    this.createCentralFactPublisher = createCentralFactPublisher;
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

type Deps = {
  centralFactDAO: ICentralFactDAO;
  createCentralFactPublisher: CreateCentralFactObserver.Publisher;
};
