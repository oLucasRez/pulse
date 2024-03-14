import { ForbiddenError, NotFoundError } from '@domain/errors';
import { GameModel, RoundModel } from '@domain/models';
import {
  GetCurrentGameUsecase,
  NextGameStateUsecase,
  StartRoundUsecase,
} from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class DAONextGameStateUsecase implements NextGameStateUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly startRound: StartRoundUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAONextGameStateUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.startRound = deps.startRound;
    this.changeGamePublisher = deps.changeGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.roundID)
      throw new ForbiddenError({
        metadata: { tried: 'go to next game state without a round' },
      });

    if (!currentGame.lightSpotRoundID)
      throw new ForbiddenError({
        metadata: { tried: 'go to next game state without a light-spot round' },
      });

    let nextState = currentGame.state;
    let nextRoundClockwise: RoundModel.Clockwise | null = null;

    switch (nextState) {
      case 'initial:state':
        nextState = 'creating:subjects';
        nextRoundClockwise = 'clockwise';
        break;
      case 'creating:subjects':
        nextState = 'creating:centralFact';
        nextRoundClockwise = 'counterclockwise';
        break;
      case 'creating:centralFact':
        nextState = 'creating:questions';
        nextRoundClockwise = 'clockwise';
        break;
      case 'creating:questions':
        nextState = 'creating:answers';
        nextRoundClockwise = 'counterclockwise';
        break;
      case 'creating:answers':
        nextState = 'creating:lightSpot';
        nextRoundClockwise = 'clockwise';
        break;
      case 'creating:lightSpot':
        nextState = 'creating:questions';
        break;
      default:
        break;
    }

    // initial:state -> creating:subjects -> creating:centralFact ┬> creating:questions -> creating:answers -> creating:lightSpot ┐
    //                                                            └---------------------------------------------------------------┘

    const dto = await this.gameDAO.update(currentGame.id, { state: nextState });

    if (nextRoundClockwise)
      await this.startRound.execute(currentGame.roundID, nextRoundClockwise);

    if (nextState === 'creating:subjects')
      await this.startRound.execute(currentGame.lightSpotRoundID, 'clockwise');

    const game = GameHydrator.hydrate(dto);

    this.changeGamePublisher.notifyChangeGame(game);

    return game;
  }
}

export namespace DAONextGameStateUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    startRound: StartRoundUsecase;
    changeGamePublisher: ChangeGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
