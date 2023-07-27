import { Color } from '@domain/enums';

import { Dice, Game, Question, Subject, User } from '..';
import { Model } from '../model';

export class Player extends Model {
  private name: string;
  private color: Color;
  private user: User | null;
  private game: Game;
  private dice: Dice;
  private subject: Subject | null;

  public constructor(props: Player.NewProps) {
    const { name, color, user = null, game, dice, ...modelProps } = props;

    super({ ...modelProps });

    this.name = name;
    this.color = color;
    this.user = user;
    this.game = game;
    this.dice = dice;
    this.subject = null;

    this.dice.setOwner(this);
  }

  public toDTO(): Player.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      name: this.name,
      color: this.color,
      userID: this.user?.id || null,
      gameID: this.game.id,
      diceID: this.dice.id,
      subjectID: this.subject?.id || null,
    });
  }

  public getColor(): Color {
    return this.color;
  }

  public getDice(): Dice {
    return this.dice;
  }

  public getSubject(): Subject | null {
    return this.subject;
  }

  public createSubject(props: Player.CreateSubjectProps): Subject {
    const { ...subjectProps } = props;

    const subject = new Subject({
      ...subjectProps,
      color: this.color,
      position: this.dice.getPosition(),
      author: this,
    });

    this.subject = subject;

    return subject;
  }

  public createQuestion(props: Player.CreateQuestionProps): Question {
    const { ...questionProps } = props;

    const dicePosition = this.dice.getPosition();

    if (!dicePosition) throw 'Dice must be in the map';

    return new Question({
      ...questionProps,
      position: dicePosition,
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
  export type DTO = Model.DTO & {
    name: string;
    color: Color;
    userID: string | null;
    gameID: string;
    diceID: string;
    subjectID: string | null;
  };

  export type NewProps = Model.NewProps & {
    name: string;
    color: Color;
    user?: User;
    game: Game;
    dice: Dice;
  };

  export type CreateSubjectProps = Omit<
    Subject.NewProps,
    'color' | 'position' | 'author'
  >;

  export type CreateQuestionProps = Omit<
    Question.NewProps,
    'position' | 'author'
  >;
}
