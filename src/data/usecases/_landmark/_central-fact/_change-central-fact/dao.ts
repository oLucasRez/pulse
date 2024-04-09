import { NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';
import {
  ChangeCentralFactUsecase,
  GetCentralFactUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { ChangeCentralFactObserver } from '@data/observers';

export class DAOChangeCentralFactUsecase implements ChangeCentralFactUsecase {
  private readonly getCentralFact: GetCentralFactUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly changeCentralFactPublisher: ChangeCentralFactObserver.Publisher;

  public constructor(deps: DAOChangeCentralFactUsecase.Deps) {
    this.getCentralFact = deps.getCentralFact;
    this.centralFactDAO = deps.centralFactDAO;
    this.changeCentralFactPublisher = deps.changeCentralFactPublisher;
  }

  public async execute(
    payload: ChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel> {
    const { description } = payload;

    let centralFact = await this.getCentralFact.execute();

    if (!centralFact)
      throw new NotFoundError({ metadata: { entity: 'CentralFact' } });

    const dto = await this.centralFactDAO.update(centralFact.id, {
      description,
    });

    centralFact = CentralFactHydrator.hydrate(dto);

    this.changeCentralFactPublisher.notifyChangeCentralFact(centralFact);

    return centralFact;
  }
}

export namespace DAOChangeCentralFactUsecase {
  export type Deps = {
    getCentralFact: GetCentralFactUsecase;
    centralFactDAO: ICentralFactDAO;
    changeCentralFactPublisher: ChangeCentralFactObserver.Publisher;
  };
}
