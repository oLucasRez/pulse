import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { Round } from '../../_round';
import { CentralFactCreationGameState } from '../_central-fact-creation';
import { GameState } from '../state';

export class SubjectCreationGameState extends GameState {
  private _rounding: Round.StartReturn;

  private _turn: IteratorResult<Player, null>;

  public constructor(context: GameState.NewProps) {
    super(context);

    this._rounding = this.context.getRound().start(Round.Rotation.CLOCKWISE);
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

  public createSubject(props: GameState.CreateSubjectProps): Subject {
    const currentPlayer = this._turn.value;
    if (!currentPlayer) throw 'currentPlayer not found';

    if (currentPlayer.getSubject()) throw 'Player already have a subject';

    const subject = currentPlayer.createSubject(props);

    return subject;
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollCurrentDice(): Dice {
    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    dice.roll();

    return dice;
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public getCrossings(): crossing[] {
    throw 'getCrossings() method not allowed';
  }

  public createQuestion(): Question {
    throw 'createQuestion() method not allowed';
  }
}
