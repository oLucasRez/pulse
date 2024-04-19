import { ForbiddenError, NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  INextGameStateUsecase,
  IPassTurnUsecase,
  IStartRoundUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class NextGameStateUsecase implements INextGameStateUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly passTurn: IPassTurnUsecase;
  private readonly startRound: IStartRoundUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({
    getCurrentGame,
    passTurn,
    startRound,
    gameDAO,
    gameHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.passTurn = passTurn;
    this.startRound = startRound;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
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

    const game = await this.gameHydrator.hydrate(dto);

    return game;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  passTurn: IPassTurnUsecase;
  startRound: IStartRoundUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
