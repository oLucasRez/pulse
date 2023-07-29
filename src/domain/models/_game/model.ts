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
import { Model } from '../model';
import { Round } from './_round';
import { GameState, InitialGameState } from './states';

type Crossing = { scope: Subject[]; position: vector };

export class Game extends Model {
  private host: User;
  private round: Round;
  // private lightSpotRound: Round;
  private state: GameState;
  private centralPulse: CentralPulse;
  private subjectPulses: SubjectPulse[];
  private questions: Question[];
  private availableDices: Dice[];

  public constructor(props: Game.NewProps) {
    const { host, ...modelProps } = props;

    super({ ...modelProps });

    this.host = host;
    this.round = new Round();
    // this.lightSpotRound = new Round();
    this.state = new InitialGameState(this);
    this.subjectPulses = [];
    this.questions = [];

    this.centralPulse = new CentralPulse({});

    const d4 = new Dice({ sides: 4 });
    const d6 = new Dice({ sides: 6 });
    const d8 = new Dice({ sides: 8 });
    const d10 = new Dice({ sides: 10 });
    const d12 = new Dice({ sides: 12 });

    this.availableDices = [d4, d6, d8, d10, d12];
  }

  public toDTO(): Game.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      hostID: this.host.id,
    });
  }

  public getRound(): Round {
    return this.round;
  }

  public getCentralPulse(): CentralPulse {
    return this.centralPulse;
  }

  public getPulses(): Pulse[] {
    return [...this.subjectPulses, this.centralPulse];
  }

  public getCircles(): circle[] {
    const pulses = this.getPulses();

    return pulses.reduce<circle[]>(
      (array, pulse) => [...array, ...pulse.getCircles()],
      [],
    );
  }

  public setState(state: GameState): void {
    this.state = state;
  }

  public start(): void {
    this.state.start();
  }

  public getCurrentPlayer(): Player | null {
    return this.state.getCurrentPlayer();
  }

  public finishTurn(): void {
    this.state.finishTurn();
  }

  public createSubject(props: Game.CreateSubjectProps): Subject {
    const subject = this.state.createSubject(props);

    return subject;
  }

  public getCentralFact(): CentralFact {
    return this.centralPulse.getCentralFact();
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact = this.state.updateCentralFactDescription(description);

    return centralFact;
  }

  public updateCurrentDiceValue(value: number): Dice {
    return this.state.updateCurrentDiceValue(value);
  }

  public updateCentralPulseAmount(): CentralPulse {
    const centralPulse = this.state.updateCentralPulseAmount();

    return centralPulse;
  }

  public updateCurrentDicePosition(position: vector): Dice {
    return this.state.updateCurrentDicePosition(position);
  }

  public updateCurrentSubjectPosition(): Subject {
    return this.state.updateCurrentSubjectPosition();
  }

  public createSubjectPulse(gap: number): SubjectPulse {
    return this.state.createSubjectPulse(gap);
  }

  public createPlayer(props: Game.CreatePlayerProps): Player {
    const { ...playerProps } = props;

    const dice = this.availableDices.shift();

    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ ...playerProps, dice, game: this });

    this.round.addPlayer(player);

    return player;
  }

  public addSubjectPulse(pulse: SubjectPulse): void {
    this.subjectPulses.push(pulse);
  }

  public addQuestion(question: Question): void {
    this.questions.push(question);
  }

  public getCrossings(
    targetPulse: SubjectPulse,
    tolerance: number = 0,
  ): Crossing[] {
    const targetLastCircle = targetPulse.getLastCircle();

    if (!targetLastCircle) return [];

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

      for (const circle of pulse.getCircles()) {
        const positions = calcCrossings(targetLastCircle, circle);

        positions.map((position) =>
          crossings.push({
            scope: [targetPulse.getSubject(), pulse.getSubject()],
            position,
          }),
        );
      }
    }

    for (const circle of this.centralPulse.getCircles()) {
      const positions = calcCrossings(targetLastCircle, circle);

      positions.map((position) =>
        crossings.push({
          scope: [targetPulse.getSubject()],
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
  export type DTO = Model.DTO & {
    hostID: string;
  };

  export type NewProps = Model.NewProps & {
    host: User;
  };

  export type CreateSubjectProps = GameState.CreateSubjectProps;

  export type CreatePlayerProps = Omit<Player.NewProps, 'dice' | 'game'>;
}
