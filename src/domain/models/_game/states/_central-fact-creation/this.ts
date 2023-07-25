import { CentralFact, CentralPulse, Player, Subject } from '@domain/models';

import { Round } from '../../_round';
import { InitialGameState } from '../_initial';
import { GameState } from '../this';
import {
  CentralFactCreationState,
  CentralFactDescriptionUpdationState,
} from './states';

export class CentralFactCreationGameState extends GameState {
  private _rounding: Round.StartReturn;

  private _turn: IteratorResult<Player, null>;
  public get turn(): IteratorResult<Player, null> {
    return this._turn;
  }

  private _state: CentralFactCreationState;

  public constructor(context: CentralFactCreationGameState.NewProps) {
    super(context);

    this._rounding = this.context.round.start(Round.Rotation.ANTICLOCKWISE);
    this._turn = this._rounding.next();
    this._state = new CentralFactDescriptionUpdationState(this);
  }

  public setState(state: CentralFactCreationState): void {
    this._state = state;
  }

  public start(): void {
    throw 'start() method not allowed';
  }

  public getCurrentPlayer(): Player | null {
    const currentPlayer = this._turn.value;

    return currentPlayer;
  }

  public finishTurn(): void {
    this._turn = this._rounding.next();

    if (this._turn.done)
      return this.context.setState(new InitialGameState(this.context));
  }

  public createSubject(): Subject {
    throw 'createSubject() method not allowed';
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact = this._state.updateCentralFactDescription(description);

    return centralFact;
  }

  public rollDice(): number {
    const value = this._state.rollDice();

    return value;
  }

  public updateCentralPulseAmount(amount: number): CentralPulse {
    const centralPulse = this._state.updateCentralPulseAmount(amount);

    return centralPulse;
  }
}

export namespace CentralFactCreationGameState {
  export type NewProps = GameState.NewProps;
}
