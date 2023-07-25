import { abs, pow, sqrt, unique, Vector } from '@utils';

import { circle, vector } from '@types';

import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Pulse,
  Question,
  Subject,
  SubjectPulse,
  User,
} from '..';
import { Model } from '../this';
import { Round } from './_round';
import { GameState, InitialGameState } from './states';

type Crossing = { scope: Subject[]; position: vector };

export class Game extends Model {
  private _host: User;
  public get host(): User {
    return this._host;
  }

  private _round: Round;
  public get round(): Round {
    return this._round;
  }

  private _lightSpotRound: Round;
  public get lightSpotRound(): Round {
    return this._lightSpotRound;
  }

  private _state: GameState;

  private _centralPulse: CentralPulse;
  public get centralPulse(): CentralPulse {
    return this._centralPulse;
  }

  private _subjectPulses: SubjectPulse[];
  public get subjectPulses(): SubjectPulse[] {
    return this._subjectPulses;
  }

  public get pulses(): Pulse[] {
    return [...this._subjectPulses, this.centralPulse];
  }

  public get circles(): circle[] {
    return this.pulses.reduce(
      (array, pulse) => [...array, ...pulse.circles],
      [] as circle[],
    );
  }

  private _questions: Question[];
  public get questions(): Question[] {
    return this._questions;
  }

  private _availableDices: Dice[];

  public constructor(props: Game.NewProps) {
    const { host, ...modelProps } = props;

    super({ ...modelProps });

    this._host = host;
    this._round = new Round();
    this._lightSpotRound = new Round();
    this._state = new InitialGameState(this);
    this._subjectPulses = [];
    this._questions = [];

    this._centralPulse = new CentralPulse({});

    const d4 = new Dice({ sides: 4 });
    const d6 = new Dice({ sides: 6 });
    const d8 = new Dice({ sides: 8 });
    const d10 = new Dice({ sides: 10 });
    const d12 = new Dice({ sides: 12 });

    this._availableDices = [d4, d6, d8, d10, d12];
  }

  public setState(state: GameState): void {
    this._state = state;
  }

  public start(): void {
    this._state.start();
  }

  public getCurrentPlayer(): Player | null {
    const currentPlayer = this._state.getCurrentPlayer();

    return currentPlayer;
  }

  public finishTurn(): void {
    this._state.finishTurn();
  }

  public createSubject(props: Game.CreateSubjectProps): Subject {
    const subject = this._state.createSubject(props);

    return subject;
  }

  public getCentralFact(): CentralFact {
    const { centralFact } = this._centralPulse;

    return centralFact;
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

  public createPlayer(props: Game.CreatePlayerProps): Player {
    const { ...playerProps } = props;

    const dice = this._availableDices.shift();

    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ ...playerProps, dice, game: this });

    this._round.addPlayer(player);

    return player;
  }

  public addSubjectPulse(pulse: SubjectPulse): void {
    this._subjectPulses.push(pulse);
  }

  public addQuestion(question: Question): void {
    this._questions.push(question);
  }

  public getCrossings(
    targetPulse: SubjectPulse,
    tolerance: number = 0,
  ): Crossing[] {
    if (!targetPulse.lastCircle) return [];

    function calcCrossings(c1: circle, c2: circle): vector[] {
      const d = c1.c.sub(c2.c).mag();
      const a = (pow(c1.r, 2) - pow(c2.r, 2) + pow(d, 2)) / (2 * d);
      const h = sqrt(pow(c1.r, 2) - pow(a, 2));
      const p3 = c1.c.add(c2.c.sub(c1.c).mult(a / d));

      if (isNaN(h)) return [];

      return [
        Vector(
          p3.x + ((c2.c.y - c1.c.y) * h) / d,
          p3.y - ((c2.c.x - c1.c.x) * h) / d,
        ),
        Vector(
          p3.x - ((c2.c.y - c1.c.y) * h) / d,
          p3.y + ((c2.c.x - c1.c.x) * h) / d,
        ),
      ];
    }

    const crossings: Crossing[] = [];

    for (const pulse of this.subjectPulses) {
      if (targetPulse.isEqual(pulse)) continue;

      for (const circle of pulse.circles) {
        const positions = calcCrossings(targetPulse.lastCircle, circle);

        positions.map((position) =>
          crossings.push({
            scope: [targetPulse.subject, pulse.subject],
            position,
          }),
        );
      }
    }

    for (const circle of this.centralPulse.circles) {
      const positions = calcCrossings(targetPulse.lastCircle, circle);

      positions.map((position) =>
        crossings.push({
          scope: [targetPulse.subject],
          position,
        }),
      );
    }

    const crossingsAreEqual = (
      crossingA: Crossing,
      crossingB: Crossing,
    ): boolean =>
      abs(crossingA.position.mag() - crossingB.position.mag()) <= tolerance;

    const replaceCrossingsWith = (
      crossingA: Crossing,
      crossingB: Crossing,
    ): Crossing => {
      const pA = crossingA.scope.length;
      const pB = crossingB.scope.length;

      const position = crossingA.position
        .mult(pA)
        .add(crossingB.position.mult(pB))
        .div(pA + pB);

      return { position, scope: [...crossingA.scope, ...crossingB.scope] };
    };

    const filteredCrossings = unique(
      crossings,
      crossingsAreEqual,
      replaceCrossingsWith,
    );

    for (const crossing of filteredCrossings) {
      const subjectsAreEqual = (
        subjectA: Subject,
        subjectB: Subject,
      ): boolean => subjectA.isEqual(subjectB);

      crossing.scope = unique(crossing.scope, subjectsAreEqual);
    }

    return filteredCrossings;
  }
}

export namespace Game {
  export type NewProps = Model.NewProps & {
    host: User;
  };

  export type CreateSubjectProps = GameState.CreateSubjectProps;

  export type CreatePlayerProps = Omit<Player.NewProps, 'dice' | 'game'>;
}
