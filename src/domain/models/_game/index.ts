import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { circle } from '@types';

import { CentralPulse, Dice, Player, Pulse, User } from '..';

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

  private _pulses: Pulse[];
  public get pulses(): Pulse[] {
    return [...this._pulses, this.centralPulse];
  }

  public get circles(): circle[] {
    return this.pulses.reduce(
      (array, pulse) => [...array, ...pulse.circles],
      [] as circle[],
    );
  }

  private _availableDices: Dice[];

  public constructor(props: ConstructorProps) {
    const { id = uuid(), host } = props;

    this.id = id;
    this._host = host;
    this._players = [];
    this._pulses = [];

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

  public addPulse(pulse: Pulse): void {
    this._pulses.push(pulse);
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
