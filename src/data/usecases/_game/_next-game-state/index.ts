import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetLightSpotRoundUsecase,
  INextGameStateUsecase,
  IPassLightSpotRoundTurnUsecase,
  IPassRoundTurnUsecase,
  IStartLightSpotRoundUsecase,
  IStartRoundUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class NextGameStateUsecase implements INextGameStateUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly passLightSpotRoundTurn: IPassLightSpotRoundTurnUsecase;
  private readonly passRoundTurn: IPassRoundTurnUsecase;
  private readonly startLightSpotRound: IStartLightSpotRoundUsecase;
  private readonly startRound: IStartRoundUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({
    getCurrentGame,
    getLightSpotRound,
    passLightSpotRoundTurn,
    passRoundTurn,
    startLightSpotRound,
    startRound,
    gameDAO,
    gameHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getLightSpotRound = getLightSpotRound;
    this.passLightSpotRoundTurn = passLightSpotRoundTurn;
    this.passRoundTurn = passRoundTurn;
    this.startLightSpotRound = startLightSpotRound;
    this.startRound = startRound;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    let state = currentGame.state;

    if (state[0] === 'initial:state') {
      state = ['creating:subjects'];
      await Promise.all([
        this.startRound.execute('clockwise'),
        this.startLightSpotRound.execute(),
      ]);
    } else if (state[0] === 'creating:subjects') {
      const round = await this.passRoundTurn.execute();

      if (round.finished) {
        state = ['creating:centralFact', 'change:centralFact'];
        await this.startRound.execute('counterclockwise');
      }
    } else if (state[0] === 'creating:centralFact') {
      if (state[1] === 'change:centralFact') {
        state = ['creating:centralFact', 'roll:dice'];
      } else if (state[1] === 'roll:dice') {
        state = ['creating:centralFact', 'update:dice:position'];
      } else if (state[1] === 'update:dice:position') {
        const round = await this.passRoundTurn.execute();

        if (round.finished) {
          state = ['creating:questions', 'roll:dice'];
          await this.startRound.execute('clockwise');
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
        const round = await this.passRoundTurn.execute();

        if (round.finished) {
          state = ['creating:answers', 'create:answer'];
          await this.startRound.execute('counterclockwise');
        } else state = ['creating:questions', 'roll:dice'];
      }
    } else if (state[0] === 'creating:answers') {
      if (state[1] === 'create:answer') {
        state = ['creating:answers', 'vote:answer'];
      } else if (state[1] === 'vote:answer') {
        const round = await this.passRoundTurn.execute();

        if (round.finished) {
          const lightSpotRound = await this.getLightSpotRound.execute();

          if (lightSpotRound?.finished) {
            state = ['final:state'];
          } else {
            state = ['creating:lightSpot', 'roll:dice'];
            await this.startRound.execute('clockwise');
          }
        } else state = ['creating:answers', 'create:answer'];
      }
    } else if (state[0] === 'creating:lightSpot') {
      if (state[1] === 'roll:dice') {
        state = ['creating:lightSpot', 'create:subject'];
      } else if (state[1] === 'create:subject') {
        state = ['creating:questions', 'roll:dice'];

        await Promise.all([
          this.passLightSpotRoundTurn.execute(),
          this.startRound.execute('clockwise'),
        ]);
      }
    }

    const dto = await this.gameDAO.update(currentGame.id, { state });

    return this.gameHydrator.hydrate(dto);
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getLightSpotRound: IGetLightSpotRoundUsecase;
  passLightSpotRoundTurn: IPassLightSpotRoundTurnUsecase;
  passRoundTurn: IPassRoundTurnUsecase;
  startLightSpotRound: IStartLightSpotRoundUsecase;
  startRound: IStartRoundUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
