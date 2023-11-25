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

  protected constructor(props: Player.NewProps) {
    const {
      name,
      color,
      user = null,
      game,
      dice,
      subject = null,
      ...modelProps
    } = props;

    super(modelProps);

    this.name = name;
    this.color = color;
    this.user = user;
    this.game = game;
    this.dice = dice;
    this.subject = subject;

    this.dice.setOwner(this);
  }
  public static create(props: Player.CreateProps): Player {
    return new Player(props);
  }
  public static recreate(props: Player.RecreateProps): Player {
    return new Player(props);
  }

  public getName(): Player['name'] {
    return this.name;
  }

  public getColor(): Player['color'] {
    return this.color;
  }

  public getUser(): Player['user'] {
    return this.user;
  }

  public getGame(): Player['game'] {
    return this.game;
  }

  public getDice(): Player['dice'] {
    return this.dice;
  }

  public getSubject(): Player['subject'] {
    return this.subject;
  }

  public createMySubject(props: Player.CreateMySubjectProps): Subject {
    const subject = Subject.create({
      ...props,
      position: this.dice.getPosition(),
      color: this.color,
      author: this,
    });

    this.subject = subject;

    return subject;
  }

  public createSubject(props: Player.CreateSubjectProps): Subject {
    const subject = Subject.create({
      ...props,
      position: this.dice.getPosition(),
      author: this,
    });

    return subject;
  }

  public createQuestion(props: Player.CreateQuestionProps): Question {
    const dicePosition = this.dice.getPosition();
    if (!dicePosition) throw 'Dice must be in the map';

    return Question.create({
      ...props,
      position: dicePosition,
      author: this,
    });
  }
}
// ============================================================================
export namespace Player {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    name: Player['name'];
    color: Player['color'];
    user?: Player['user'];
    game: Player['game'];
    dice: Player['dice'];
  };

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      subject: Player['subject'];
    };

  export type CreateMySubjectProps = Omit<
    Subject.CreateProps,
    'position' | 'color' | 'author'
  >;

  export type CreateSubjectProps = Omit<
    Subject.CreateProps,
    'position' | 'author'
  >;

  export type CreateQuestionProps = Omit<
    Question.CreateProps,
    'position' | 'author'
  >;
}
