import { NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';
import {
  IChangeCentralFactUsecase,
  IGetCentralFactUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';
import { ChangeCentralFactObserver } from '@data/observers';

export class ChangeCentralFactUsecase implements IChangeCentralFactUsecase {
  private readonly getCentralFact: IGetCentralFactUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly changeCentralFactPublisher: ChangeCentralFactObserver.Publisher;

  public constructor({
    getCentralFact,
    nextGameState,
    centralFactDAO,
    changeCentralFactPublisher,
  }: Deps) {
    this.getCentralFact = getCentralFact;
    this.nextGameState = nextGameState;
    this.centralFactDAO = centralFactDAO;
    this.changeCentralFactPublisher = changeCentralFactPublisher;
  }

  public async execute(
    payload: IChangeCentralFactUsecase.Payload,
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

    await this.nextGameState.execute();

    return centralFact;
  }
}

type Deps = {
  getCentralFact: IGetCentralFactUsecase;
  nextGameState: INextGameStateUsecase;
  centralFactDAO: ICentralFactDAO;
  changeCentralFactPublisher: ChangeCentralFactObserver.Publisher;
};
