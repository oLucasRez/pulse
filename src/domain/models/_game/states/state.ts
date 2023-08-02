import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing, vector } from '@types';

import { Game } from '../model';

export abstract class GameState {
  public readonly context: Game;

  protected constructor(context: GameState.NewProps) {
    this.context = context;
  }

  public abstract start(): void;
  public abstract getCurrentPlayer(): Player | null;
  public abstract finishTurn(): void;
  public abstract createSubject(props: GameState.CreateSubjectProps): Subject;
  public abstract updateCentralFactDescription(
    description: string,
  ): CentralFact;
  public abstract rollCurrentDice(): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
  public abstract updateCurrentDicePosition(position: vector): Dice;
  public abstract updateCurrentSubjectPosition(): Subject;
  public abstract createSubjectPulse(gap: number): SubjectPulse;
  public abstract getCrossings(tolerance?: number): crossing[];
  public abstract createQuestion(
    props: GameState.CreateQuestionProps,
  ): Question;
}

export namespace GameState {
  export type NewProps = Game;

  export type CreateSubjectProps = Player.CreateSubjectProps;

  export type CreateQuestionProps = Player.CreateQuestionProps;
}
