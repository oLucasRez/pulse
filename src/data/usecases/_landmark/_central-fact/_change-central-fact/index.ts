import { NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';
import {
  IChangeCentralFactUsecase,
  IGetCentralFactUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { ICentralFactHydrator } from '@data/hydration';

export class ChangeCentralFactUsecase implements IChangeCentralFactUsecase {
  private readonly getCentralFact: IGetCentralFactUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly centralFactHydrator: ICentralFactHydrator;
  public constructor({
    getCentralFact,
    nextGameState,
    centralFactDAO,
    centralFactHydrator,
  }: Deps) {
    this.getCentralFact = getCentralFact;
    this.nextGameState = nextGameState;
    this.centralFactDAO = centralFactDAO;
    this.centralFactHydrator = centralFactHydrator;
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

    centralFact = await this.centralFactHydrator.hydrate(dto);

    await this.nextGameState.execute();

    return centralFact;
  }
}

type Deps = {
  getCentralFact: IGetCentralFactUsecase;
  nextGameState: INextGameStateUsecase;
  centralFactDAO: ICentralFactDAO;
  centralFactHydrator: ICentralFactHydrator;
};
