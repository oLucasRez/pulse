import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { circle } from '@types';

import {
  CentralPulse,
  Dice,
  Player,
  Pulse,
  Question,
  SubjectPulse,
  User,
} from '..';

type ConstructorProps = {
  id?: string;
  host: User;
};

type CreatePlayerProps = {
  id?: string;
  name: string;
  color: Color;
  user?: User;
};

export class Game {
  public readonly id: string;

  private _host: User;
  public get host(): User {
    return this._host;
  }

  private _players: Player[];
  public get players(): Player[] {
    return this._players;
  }

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

  public constructor(props: ConstructorProps) {
    const { id = uuid(), host } = props;

    this.id = id;
    this._host = host;
    this._players = [];
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

  public createPlayer(props: CreatePlayerProps): Player {
    const { id, name, color, user } = props;

    const dice = this._availableDices.shift();

    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ id, name, color, user, game: this, dice });

    this.players.push(player);

    return player;
  }

  public addSubjectPulse(pulse: SubjectPulse): void {
    this._subjectPulses.push(pulse);
  }

  public addQuestion(question: Question): void {
    this._questions.push(question);
  }

  public *start(): Generator<string> {
    const clockwise = this.players;
    const counterclockwise = [...this.players].reverse();

    for (const player of clockwise) {
      yield `Criação de Elementos (${player.name})`;
    }

    for (const player of counterclockwise) {
      yield `Criação do Fato Central (${player.name})`;
    }

    for (const lightpotPlayer of clockwise) {
      for (const player of clockwise) {
        yield `Investigação (${player.name})`;
      }

      for (const player of counterclockwise) {
        yield `Conjecturas (${player.name})`;
      }

      yield `Ponto de Luz (${lightpotPlayer.name})`;

      yield 'Verificar Sobrecarga';
    }

    yield 'Conclusão do Fato Central';
  }
}
