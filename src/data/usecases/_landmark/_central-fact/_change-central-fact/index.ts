import { NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';
import {
  IChangeCentralFactUsecase,
  IGetCentralFactUsecase,
  IGetCurrentGameUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { ICentralFactHydrator } from '@data/hydration';

export class ChangeCentralFactUsecase implements IChangeCentralFactUsecase {
  private readonly getCentralFact: IGetCentralFactUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly centralFactHydrator: ICentralFactHydrator;
  public constructor({
    getCentralFact,
    getCurrentGame,
    nextGameState,
    centralFactDAO,
    centralFactHydrator,
  }: Deps) {
    this.getCentralFact = getCentralFact;
    this.getCurrentGame = getCurrentGame;
    this.nextGameState = nextGameState;
    this.centralFactDAO = centralFactDAO;
    this.centralFactHydrator = centralFactHydrator;
  }

  public async execute(
    payload: IChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel> {
    const { description } = payload;

    const currentGame = await this.getCurrentGame.execute();
    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    let centralFact = await this.getCentralFact.execute();

    if (!centralFact)
      throw new NotFoundError({ metadata: { entity: 'CentralFact' } });

    const dto = await this.centralFactDAO.update(centralFact.id, {
      description,
    });

    centralFact = await this.centralFactHydrator.hydrate(dto);

    if (
      currentGame.state[0] === 'creating:centralFact' &&
      currentGame.state[1] === 'change:centralFact'
    )
      this.nextGameState.execute();

    return centralFact;
  }
}

type Deps = {
  getCentralFact: IGetCentralFactUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  nextGameState: INextGameStateUsecase;
  centralFactDAO: ICentralFactDAO;
  centralFactHydrator: ICentralFactHydrator;
};
