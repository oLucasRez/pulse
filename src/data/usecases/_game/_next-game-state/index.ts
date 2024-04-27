import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetLightSpotRoundUsecase,
  IGetRoundUsecase,
  INextGameStateUsecase,
  IPassLightSpotRoundTurnUsecase,
  IPassRoundTurnUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class NextGameStateUsecase implements INextGameStateUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly getRound: IGetRoundUsecase;
  private readonly passLightSpotRoundTurn: IPassLightSpotRoundTurnUsecase;
  private readonly passRoundTurn: IPassRoundTurnUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({
    getCurrentGame,
    getLightSpotRound,
    getRound,
    passLightSpotRoundTurn,
    passRoundTurn,
    gameDAO,
    gameHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getLightSpotRound = getLightSpotRound;
    this.getRound = getRound;
    this.passLightSpotRoundTurn = passLightSpotRoundTurn;
    this.passRoundTurn = passRoundTurn;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const map: Record<
      GameModel.State[0],
      (state: GameModel.State) => Promise<GameModel.State>
    > = {
      'initial:state': () => this.handleInitialState(),
      'creating:subjects': () => this.handleCreatingSubjectsState(),
      'creating:centralFact': (state) =>
        this.handleCreatingCentralFactState(state),
      'creating:questions': (state) => this.handleCreatingQuestionsState(state),
      'creating:answers': (state) => this.handleCreatingAnswersState(state),
      'creating:lightSpot': (state) => this.handleCreatingLightSpotState(state),
      'final:state': () => this.handleFinalState(),
    };

    const state = await map[currentGame.state[0]]?.(currentGame.state);

    const dto = await this.gameDAO.update(currentGame.id, { state });

    return this.gameHydrator.hydrate(dto);
  }

  private async jumpToCreatingCentralFactState(): Promise<GameModel.State> {
    await this.passRoundTurn.execute('counterclockwise');

    return ['creating:centralFact', 'change:centralFact'];
  }

  private async jumpToCreatingQuestionsState(): Promise<GameModel.State> {
    const round = await this.passRoundTurn.execute('clockwise');

    if (!round.finished) return ['creating:questions', 'roll:dice'];

    return this.jumpToCreatingAnswersState();
  }

  private async jumpToCreatingAnswersState(): Promise<GameModel.State> {
    await this.passRoundTurn.execute('counterclockwise');

    return ['creating:answers', 'create:answer'];
  }

  private async handleInitialState(): Promise<GameModel.State> {
    await Promise.all([
      this.passRoundTurn.execute('clockwise'),
      this.passLightSpotRoundTurn.execute(),
    ]);

    return ['creating:subjects'];
  }

  private async handleCreatingSubjectsState(): Promise<GameModel.State> {
    const round = await this.passRoundTurn.execute();

    if (!round.finished) return ['creating:subjects'];

    return this.jumpToCreatingCentralFactState();
  }

  private async handleCreatingCentralFactState([
    ,
    state,
  ]: GameModel.State): Promise<GameModel.State> {
    if (state === 'change:centralFact')
      return ['creating:centralFact', 'roll:dice'];

    if (state === 'roll:dice')
      return ['creating:centralFact', 'update:dice:position'];

    const round = await this.passRoundTurn.execute();

    if (!round.finished) return ['creating:centralFact', 'change:centralFact'];

    return this.jumpToCreatingQuestionsState();
  }

  private async handleCreatingQuestionsState([
    ,
    state,
  ]: GameModel.State): Promise<GameModel.State> {
    let round = await this.getRound.execute();
    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    if (round.finished) return this.jumpToCreatingAnswersState();

    if (state === 'roll:dice')
      return ['creating:questions', 'create:subjectPulse'];

    if (state === 'create:subjectPulse')
      return ['creating:questions', 'update:dice:position'];

    if (state === 'update:dice:position')
      return ['creating:questions', 'create:question'];

    round = await this.passRoundTurn.execute();

    if (!round.finished) return ['creating:questions', 'roll:dice'];

    return this.jumpToCreatingAnswersState();
  }

  private async handleCreatingAnswersState([
    ,
    state,
  ]: GameModel.State): Promise<GameModel.State> {
    if (state === 'create:answer') return ['creating:answers', 'vote:answer'];

    const round = await this.passRoundTurn.execute();

    if (!round.finished) return ['creating:answers', 'create:answer'];

    const lightSpotRound = await this.getLightSpotRound.execute();
    if (!lightSpotRound)
      throw new NotFoundError({ metadata: { entity: 'LightSpotRound' } });

    if (!lightSpotRound.finished) return ['creating:lightSpot', 'roll:dice'];

    return ['final:state'];
  }

  private async handleCreatingLightSpotState([
    ,
    state,
  ]: GameModel.State): Promise<GameModel.State> {
    if (state === 'roll:dice') return ['creating:lightSpot', 'create:subject'];

    await this.passLightSpotRoundTurn.execute();

    return this.jumpToCreatingQuestionsState();
  }

  private async handleFinalState(): Promise<GameModel.State> {
    return ['final:state'];
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getLightSpotRound: IGetLightSpotRoundUsecase;
  getRound: IGetRoundUsecase;
  passLightSpotRoundTurn: IPassLightSpotRoundTurnUsecase;
  passRoundTurn: IPassRoundTurnUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
