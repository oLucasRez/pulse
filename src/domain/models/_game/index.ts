import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { Dice, Player, Pulse, User } from '..';

export interface Game {
  id: string;
  host: User;
  players: Player[];
  pulses: Pulse[];
}

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

export class Game implements Game {
  private availableDices: Dice[];

  constructor(props: ConstructorProps) {
    const { id = uuid(), host } = props;

    this.id = id;
    this.host = host;
    this.players = [];
    this.pulses = [];

    const d4 = new Dice({ sides: 4 });
    const d6 = new Dice({ sides: 6 });
    const d8 = new Dice({ sides: 8 });
    const d10 = new Dice({ sides: 10 });
    const d12 = new Dice({ sides: 12 });

    this.availableDices = [d4, d6, d8, d10, d12];
  }

  createPlayer(props: CreatePlayerProps) {
    const { id, name, color, user } = props;

    const dice = this.availableDices.shift();

    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ id, name, color, user, game: this, dice });

    this.players.push(player);

    return player;
  }

  addPulse(pulse: Pulse) {
    this.pulses.push(pulse);
  }
}
