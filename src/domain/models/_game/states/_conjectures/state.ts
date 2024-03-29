import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  LightSpot,
  Player,
  Question,
  Round,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { LightSpotCreationGameState } from '../_light-spot-creation';
import { GameState } from '../state';
import { AnsweringQuestionState, ConjecturesState } from './states';

export class ConjecturesGameState
  extends GameState
  implements Round.RoundFinishObserver
{
  private state: ConjecturesState;
  private currentAnswer: Answer | null;

  protected constructor(props: ConjecturesGameState.NewProps) {
    const { state, currentAnswer = null, ...stateProps } = props;

    super(stateProps);

    this.state = state ?? AnsweringQuestionState.create({ ctx: this });
    this.currentAnswer = currentAnswer;

    const round = this.ctx.getRound();

    round.subscribeRoundFinishObserver(this);

    round.startRound(Round.Rotation.ANTICLOCKWISE);
  }
  public static create(
    props: ConjecturesGameState.CreateProps,
  ): ConjecturesGameState {
    return new ConjecturesGameState(props);
  }
  public static recreate(
    props: ConjecturesGameState.RecreateProps,
  ): ConjecturesGameState {
    return new ConjecturesGameState(props);
  }

  public getState(): ConjecturesGameState['state'] {
    return this.state;
  }

  public getCurrentAnswer(): ConjecturesGameState['currentAnswer'] {
    return this.currentAnswer;
  }

  public setState(state: ConjecturesGameState['state']): void {
    this.state = state;
  }

  public setCurrentAnswer(value: ConjecturesGameState['currentAnswer']): void {
    this.currentAnswer = value;
  }

  public onRoundFinish(): void {
    this.ctx.setState(LightSpotCreationGameState.create({ ctx: this.ctx }));
  }

  public answerQuestion(
    question: Question,
    props: ConjecturesGameState.AnswerQuestionProps,
  ): Answer {
    return this.state.answerQuestion(question, props);
  }

  public playerVote(player: Player, vote: boolean): void {
    return this.state.playerVote(player, vote);
  }

  public finishVoting(): boolean {
    return this.state.finishVoting();
  }

  public passTurn(): void {
    return this.state.passTurn();
  }
  // --------------------------------------------------------------------------
  public start(): void {
    throw 'Method not allowed';
  }
  public createSubject(): Subject {
    throw 'Method not allowed';
  }
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public updateCentralPulseAmount(): CentralPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public getCrossings(): crossing[] {
    throw 'Method not allowed';
  }
  public createQuestion(): Question {
    throw 'Method not allowed';
  }
  public createLightSpot(): LightSpot {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace ConjecturesGameState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = GameState.CreateProps;

  export type RecreateProps = GameState.RecreateProps &
    Required<CreateProps> & {
      state: ConjecturesGameState['state'];
      currentAnswer: ConjecturesGameState['currentAnswer'];
    };

  export type AnswerQuestionProps = GameState.AnswerQuestionProps;
}
