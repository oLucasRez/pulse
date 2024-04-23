import { ForbiddenError, NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
  IVoteAnswerUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class VoteAnswerUsecase implements IVoteAnswerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({
    getMyPlayer,
    nextGameState,
    getCurrentGame,
    answerDAO,
    answerHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.nextGameState = nextGameState;
    this.getCurrentGame = getCurrentGame;
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(value: boolean): Promise<AnswerModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const [, state] = currentGame.state;

    if (state !== 'vote:answer')
      throw new ForbiddenError({
        metadata: { tried: 'vote-answer outside vote:answer state' },
      });

    if (!currentGame.votingAnswerID)
      throw new NotFoundError({ metadata: { entity: 'VotingAnswer' } });

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.answerDAO.update(currentGame.votingAnswerID, {
      votes: { [myPlayer.id]: value },
    });

    const answer = await this.answerHydrator.hydrate(dto);

    if (answer.state !== 'voting') await this.nextGameState.execute();

    return answer;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
