import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Subject,
} from '@domain/models';

import { Game } from '../model';

export abstract class GameState {
  private _context: Game;
  public get context(): Game {
    return this._context;
  }

  protected constructor(context: GameState.NewProps) {
    this._context = context;
  }

  public abstract start(): void;
  public abstract getCurrentPlayer(): Player | null;
  public abstract finishTurn(): void;
  public abstract createSubject(props: GameState.CreateSubjectProps): Subject;
  public abstract updateCentralFactDescription(
    description: string,
  ): CentralFact;
  public abstract updateDiceValue(value: number): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
}

export namespace GameState {
  export type NewProps = Game;

  export type CreateSubjectProps = Player.CreateSubjectProps;
}
