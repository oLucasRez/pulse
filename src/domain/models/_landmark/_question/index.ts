import { Color } from '@domain/enums';

import { vector } from '@types';

import { Answer, Player, Subject } from '../..';
import { Landmark } from '../landmark';

export class Question extends Landmark {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  private _scope: Subject[];
  public get scope(): Subject[] {
    return this._scope;
  }

  private _author: Player;
  public get author(): Player {
    return this._author;
  }

  private _answers: Answer[];
  public get answers(): Answer[] {
    return this._answers;
  }

  private _fact: Answer | null;
  public get fact(): Answer | null {
    return this._fact;
  }

  public constructor(props: Question.NewProps) {
    const { description, scope, author, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this._description = description;
    this._scope = scope;
    this._author = author;
    this._answers = [];
    this._fact = null;
  }

  public createAnswer(props: Question.CreateAnswerProps): Answer {
    const { ...answerProps } = props;

    const answer = new Answer({ ...answerProps, question: this });

    this._answers.push(answer);

    return answer;
  }

  public solve(decidedAnswer: Answer): void {
    this._answers.map((answer) => {
      if (answer.id === decidedAnswer.id) this._fact = decidedAnswer;
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
    }[this.author.color];

    const ellipsis = this.description.length > 20 ? '...?' : '';

    return `${color}[Question(${this.description.slice(
      0,
      20,
    )}${ellipsis})]\x1b[0m.about(${this.scope.join(',')})`;
  }
}

export namespace Question {
  export type NewProps = Landmark.NewProps & {
    description: string;
    scope: Subject[];
    position: vector;
    author: Player;
  };

  export type CreateAnswerProps = Omit<Answer.NewProps, 'question'>;
}
