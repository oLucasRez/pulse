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

import { GameState } from '../state';

export class LightSpotCreationGameState extends GameState {
  public constructor(props: LightSpotCreationGameState.NewProps) {
    super(props);
  }

  // --------------------------------------------------------------------------
  public start(): void {
    throw 'Method not allowed';
  }
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
export namespace LightSpotCreationGameState {
  export type NewProps = GameState.NewProps;
}
