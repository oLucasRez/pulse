import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Subject,
} from '@domain/models';

import { Round } from '../../_round';
import { InitialGameState } from '../_initial';
import { GameState } from '../state';
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

    this._rounding = this.context
      .getRound()
      .start(Round.Rotation.ANTICLOCKWISE);
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
    return this._state.updateCentralFactDescription(description);
  }

  public updateDiceValue(value: number): Dice {
    return this._state.updateDiceValue(value);
  }

  public updateCentralPulseAmount(): CentralPulse {
    return this._state.updateCentralPulseAmount();
  }
}

export namespace CentralFactCreationGameState {
  export type NewProps = GameState.NewProps;
}
