import { CentralFact, CentralPulse, Player, Subject } from '@domain/models';

import { Round } from '../../_round';
import { CentralFactCreationGameState } from '../_central-fact-creation';
import { GameState } from '../this';

export class SubjectCreationGameState extends GameState {
  private _rounding: Round.StartReturn;

  private _turn: IteratorResult<Player, null>;

  public constructor(context: SubjectCreationGameState.NewProps) {
    super(context);

    this._rounding = this.context.round.start(Round.Rotation.CLOCKWISE);
    this._turn = this._rounding.next();
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
      return this.context.setState(
        new CentralFactCreationGameState(this.context),
      );
  }

  public createSubject(
    props: SubjectCreationGameState.CreateSubjectProps,
  ): Subject {
    const currentPlayer = this._turn.value;

    if (!currentPlayer) throw 'currentPlayer not found';

    if (currentPlayer.subject) throw 'Player already have a subject';

    const subject = currentPlayer.createSubject(props);

    return subject;
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollDice(): number {
    const currentPlayer = this.getCurrentPlayer();

    if (!currentPlayer) throw 'currentPlayer not found';

    const value = currentPlayer.dice.roll();

    return value;
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace SubjectCreationGameState {
  export type NewProps = GameState.NewProps;

  export type CreateSubjectProps = Player.CreateSubjectProps;
}
