import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  LightSpot,
  Model,
  Player,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { Game } from '../model';

export abstract class GameState extends Model {
  public readonly ctx: Game;

  protected constructor(props: GameState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract start(): void;
  public abstract createSubject(props: GameState.CreateSubjectProps): Subject;
  public abstract passTurn(): void;
  public abstract updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact;
  public abstract rollDice(): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
  public abstract updateDicePosition(
    position: NonNullable<Dice['position']>,
  ): Dice;
  public abstract createSubjectPulse(gap: SubjectPulse['gap']): SubjectPulse;
  public abstract getCrossings(tolerance?: number): crossing[];
  public abstract createQuestion(
    props: GameState.CreateQuestionProps,
  ): Question;
  public abstract answerQuestion(
    question: Question,
    props: GameState.AnswerQuestionProps,
  ): Answer;
  public abstract playerVote(player: Player, vote: boolean): void;
  public abstract finishVoting(): boolean;
  public abstract createLightSpot(
    props: GameState.CreateLightSpotProps,
  ): LightSpot;
}
// ============================================================================
export namespace GameState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    ctx: GameState['ctx'];
  };

  export type RecreateProps = Model.RecreateProps & Required<CreateProps>;

  export type CreateSubjectProps = Game.CreateSubjectProps;

  export type CreateQuestionProps = Game.CreateQuestionProps;

  export type AnswerQuestionProps = Game.AnswerQuestionProps;

  export type CreateLightSpotProps = Game.CreateLightSpotProps;
}
