import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { Dice, Game, Subject, User } from '..';

type ConstructorProps = {
  id?: string;
  name: string;
  color: Color;
  user?: User;
  game: Game;
  dice: Dice;
};

type CreateSubjectProps = {
  description: string;
};

export class Player {
  public readonly id: string;

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _color: Color;
  public get color(): Color {
    return this._color;
  }

  private _user: User | null;
  public get user(): User | null {
    return this._user;
  }

  private _game: Game;
  public get game(): Game {
    return this._game;
  }

  private _dice: Dice;
  public get dice(): Dice {
    return this._dice;
  }

  private _subject: Subject | null;
  public get subject(): Subject | null {
    return this._subject;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), name, color, user = null, game, dice } = props;

    this.id = id;
    this._name = name;
    this._color = color;
    this._user = user;
    this._game = game;
    this._dice = dice;
    this._subject = null;

    this._dice.setOwner(this);
  }

  public createSubject(props: CreateSubjectProps): Subject {
    const { description } = props;

    const subject = new Subject({
      description,
      color: this.color,
      author: this,
    });

    this._subject = subject;

    return subject;
  }

  public toString(): string {
    const colorMap: Record<Color, string> = {
      [Color.RED]: '\x1b[31m',
      [Color.GREEN]: '\x1b[32m',
      [Color.BLUE]: '\x1b[34m',
      [Color.CYAN]: '\x1b[36m',
      [Color.PURPLE]: '\x1b[35m',
      [Color.YELLOW]: '\x1b[33m',
      [Color.ORANGE]: '\x1b[33m',
      [Color.PINK]: '\x1b[35m',
      [Color.BROWN]: '\x1b[31m',
      [Color.CRIMSON]: '\x1b[31m',
      [Color.TURQUOISE]: '\x1b[36m',
      [Color.BEIGE]: '\x1b[37m',
      [Color.GREY]: '\x1b[37m',
    };

    return `${colorMap[this.color]}[Player(${this.name})]\x1b[0m`;
  }
}
