import { ForbiddenError, NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  GetCurrentGameUsecase,
  NextGameStateUsecase,
  PassTurnUsecase,
  StartRoundUsecase,
} from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class DAONextGameStateUsecase implements NextGameStateUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly passTurn: PassTurnUsecase;
  private readonly startRound: StartRoundUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAONextGameStateUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.passTurn = deps.passTurn;
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

    let state = currentGame.state;

    if (state[0] === 'initial:state') {
      state = ['creating:subjects'];
      await this.startRound.execute(currentGame.roundID, 'clockwise');
      await this.startRound.execute(currentGame.lightSpotRoundID, 'clockwise');
    } else if (state[0] === 'creating:subjects') {
      const round = await this.passTurn.execute(currentGame.roundID);

      if (round.finished) {
        state = ['creating:centralFact', 'change:centralFact'];
        await this.startRound.execute(currentGame.roundID, 'counterclockwise');
      }
    } else if (state[0] === 'creating:centralFact') {
      if (state[1] === 'change:centralFact') {
        state = ['creating:centralFact', 'roll:dice'];
      } else if (state[1] === 'roll:dice') {
        state = ['creating:centralFact', 'update:dice:position'];
      } else if (state[1] === 'update:dice:position') {
        const round = await this.passTurn.execute(currentGame.roundID);

        if (round.finished) {
          state = ['creating:questions'];
          await this.startRound.execute(currentGame.roundID, 'clockwise');
        } else state = ['creating:centralFact', 'change:centralFact'];
      }
    } else if (state[0] === 'creating:questions') {
      const round = await this.passTurn.execute(currentGame.roundID);

      if (round.finished) {
        state = ['creating:answers'];
        await this.startRound.execute(currentGame.roundID, 'counterclockwise');
      }
    } else if (state[0] === 'creating:answers') {
      const round = await this.passTurn.execute(currentGame.roundID);

      if (round.finished) {
        state = ['creating:lightSpot'];
        await this.startRound.execute(currentGame.roundID, 'clockwise');
      }
    } else if (state[0] === 'creating:lightSpot') {
      const lightSpotRound = await this.passTurn.execute(
        currentGame.lightSpotRoundID,
      );

      if (lightSpotRound.finished) {
        state = ['final:state'];
      } else {
        state = ['creating:questions'];
        await this.startRound.execute(currentGame.roundID, 'clockwise');
      }
    }

    // initial:state -> creating:subjects -> creating:centralFact ┬> creating:questions -> creating:answers -> creating:lightSpot ┐
    //                                                            └---------------------------------------------------------------┘

    const dto = await this.gameDAO.update(currentGame.id, { state });

    const game = GameHydrator.hydrate(dto);

    this.changeGamePublisher.notifyChangeGame(game);

    return game;
  }
}

export namespace DAONextGameStateUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    passTurn: PassTurnUsecase;
    startRound: StartRoundUsecase;
    changeGamePublisher: ChangeGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
