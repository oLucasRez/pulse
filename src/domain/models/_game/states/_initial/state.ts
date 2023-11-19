import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { SubjectsCreationGameState } from '../_subjects-creation';
import { GameState } from '../state';

export class InitialGameState extends GameState {
  public constructor(props: InitialGameState.NewProps) {
    super(props);
  }

  public start(): void {
    this.ctx.setState(new SubjectsCreationGameState({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public createSubject(): Subject {
    throw 'Method not allowed';
  }
  public passTurn(): void {
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
  public answerQuestion(): Answer {
    throw 'Method not allowed';
  }
  public playerVote(): void {
    throw 'Method not allowed';
  }
  public finishVoting(): boolean {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace InitialGameState {
  export type NewProps = GameState.NewProps;
}
