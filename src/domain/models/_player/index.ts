import { Color } from '@domain/enums';

import { Dice, Game, Question, Subject, User } from '..';
import { Model } from '../model';

export class Player extends Model {
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

  public constructor(props: Player.ConstructorProps) {
    const { name, color, user = null, game, dice, ...modelProps } = props;

    super({ ...modelProps });

    this._name = name;
    this._color = color;
    this._user = user;
    this._game = game;
    this._dice = dice;
    this._subject = null;

    this._dice.setOwner(this);
  }

  public createSubject(props: Player.CreateSubjectProps): Subject {
    const { ...subjectProps } = props;

    const subject = new Subject({
      ...subjectProps,
      color: this.color,
      position: this.dice.position,
      author: this,
    });

    this._subject = subject;

    return subject;
  }

  public createQuestion(props: Player.CreateQuestionProps): Question {
    const { ...questionProps } = props;

    if (!this.dice.position) throw 'Dice must be in the map';

    return new Question({
      ...questionProps,
      position: this.dice.position,
      author: this,
    });
  }

  public toString(): string {
    const color = {
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
    }[this.color];

    return `${color}[Player(${this.name})]\x1b[0m`;
  }
}

export namespace Player {
  export type ConstructorProps = Model.ConstructorProps & {
    name: string;
    color: Color;
    user?: User;
    game: Game;
    dice: Dice;
  };

  export type CreateSubjectProps = Omit<
    Subject.ConstructorProps,
    'color' | 'position' | 'author'
  >;

  export type CreateQuestionProps = Omit<
    Question.ConstructorProps,
    'position' | 'author'
  >;
}
