import { CentralFact, CentralPulse, Player, Subject } from '@domain/models';

import { Game } from '../this';

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
  public abstract rollDice(): number;
  public abstract updateCentralPulseAmount(amount: number): CentralPulse;
}

export namespace GameState {
  export type NewProps = Game;

  export type CreateSubjectProps = Player.CreateSubjectProps;
}
