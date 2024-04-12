import { ForbiddenError, NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  GetCurrentGameUsecase,
  NextGameStateUsecase,
  PassTurnUsecase,
  StartRoundUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class DAONextGameStateUsecase implements NextGameStateUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly passTurn: PassTurnUsecase;
  private readonly startRound: StartRoundUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

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
    let voting: null | undefined = undefined;

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
          state = ['creating:questions', 'roll:dice'];
          await this.startRound.execute(currentGame.roundID, 'clockwise');
        } else state = ['creating:centralFact', 'change:centralFact'];
      }
    } else if (state[0] === 'creating:questions') {
      if (state[1] === 'roll:dice') {
        state = ['creating:questions', 'create:subjectPulse'];
      } else if (state[1] === 'create:subjectPulse') {
        state = ['creating:questions', 'update:dice:position'];
      } else if (state[1] === 'update:dice:position') {
        state = ['creating:questions', 'create:question'];
      } else if (state[1] === 'create:question') {
        const round = await this.passTurn.execute(currentGame.roundID);

        if (round.finished) {
          state = ['creating:answers', 'create:answer'];
          await this.startRound.execute(
            currentGame.roundID,
            'counterclockwise',
          );
        } else state = ['creating:questions', 'roll:dice'];
      }
    } else if (state[0] === 'creating:answers') {
      if (state[1] === 'create:answer') {
        state = ['creating:answers', 'vote:answer'];
      } else if (state[1] === 'vote:answer') {
        const round = await this.passTurn.execute(currentGame.roundID);
        voting = null;

        if (round.finished) {
          state = ['creating:lightSpot'];
          await this.startRound.execute(currentGame.roundID, 'clockwise');
        }
      }
    } else if (state[0] === 'creating:lightSpot') {
      const lightSpotRound = await this.passTurn.execute(
        currentGame.lightSpotRoundID,
      );

      if (lightSpotRound.finished) {
        state = ['final:state'];
      } else {
        state = ['creating:questions', 'roll:dice'];
        await this.startRound.execute(currentGame.roundID, 'clockwise');
      }
    }

    // initial:state -> creating:subjects -> creating:centralFact ┬> creating:questions -> creating:answers -> creating:lightSpot ┐
    //                                                            └---------------------------------------------------------------┘

    const dto = await this.gameDAO.update(currentGame.id, { state, voting });

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
    gameDAO: IGameDAO;
  };
}
