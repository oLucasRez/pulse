import { Color } from '@domain/enums';

import { Player, Question } from '..';
import { Model } from '../model';

export class Answer extends Model {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  private _question: Question;
  public get question(): Question {
    return this._question;
  }

  public get isFact(): boolean {
    return this.id === this.question.fact?.id;
  }

  private _author: Player;
  public get author(): Player {
    return this._author;
  }

  public constructor(props: Answer.ConstructorProps) {
    const { description, question, author, ...modelProps } = props;

    super({ ...modelProps });

    this._description = description;
    this._question = question;
    this._author = author;
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
    }[this.author.color];

    const fact = this.isFact ? 'fact,' : '';
    const ellipsis = this.description.length > 20 ? '...' : '';

    return `${color}[Answer(${fact}${this.description.slice(
      0,
      20,
    )}${ellipsis})]\x1b[0m`;
  }
}

export namespace Answer {
  export type ConstructorProps = Model.ConstructorProps & {
    description: string;
    question: Question;
    author: Player;
  };
}
