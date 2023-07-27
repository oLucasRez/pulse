import { Color } from '@domain/enums';

import { vector } from '@types';

import { Answer, Player, Subject } from '../..';
import { Landmark } from '../model';

export class Question extends Landmark {
  private description: string;
  private scope: Subject[];
  private author: Player;
  private answers: Answer[];
  private fact: Answer | null;

  public constructor(props: Question.NewProps) {
    const { description, scope, author, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this.description = description;
    this.scope = scope;
    this.author = author;
    this.answers = [];
    this.fact = null;
  }

  public toDTO(): Question.DTO {
    const landmarkDTO = super.toDTO();

    return Object.freeze({
      ...landmarkDTO,
      description: this.description,
      scopeIDs: this.scope.map(({ id }) => id),
      authorID: this.author.id,
      answerIDs: this.answers.map(({ id }) => id),
      factID: this.fact?.id || null,
    });
  }

  public getFact(): Answer | null {
    return this.fact;
  }

  public createAnswer(props: Question.CreateAnswerProps): Answer {
    const { ...answerProps } = props;

    const answer = new Answer({ ...answerProps, question: this });

    this.answers.push(answer);

    return answer;
  }

  public solve(decidedAnswer: Answer): void {
    this.answers.map((answer) => {
      if (answer.id === decidedAnswer.id) this.fact = decidedAnswer;
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
    }[this.author.getColor()];

    const ellipsis = this.description.length > 20 ? '...?' : '';

    return `${color}[Question(${this.description.slice(
      0,
      20,
    )}${ellipsis})]\x1b[0m.about(${this.scope.join(',')})`;
  }
}

export namespace Question {
  export type DTO = Landmark.DTO & {
    description: string;
    scopeIDs: string[];
    authorID: string;
    answerIDs: string[];
    factID: string | null;
  };

  export type NewProps = Landmark.NewProps & {
    description: string;
    scope: Subject[];
    position: vector;
    author: Player;
  };

  export type CreateAnswerProps = Omit<Answer.NewProps, 'question'>;
}
