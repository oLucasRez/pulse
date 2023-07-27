import { Color } from '@domain/enums';

import { Player, Question } from '..';
import { Model } from '../model';

export class Answer extends Model {
  private description: string;
  private question: Question;
  private author: Player;

  public constructor(props: Answer.NewProps) {
    const { description, question, author, ...modelProps } = props;

    super({ ...modelProps });

    this.description = description;
    this.question = question;
    this.author = author;
  }

  public toDTO(): Answer.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      description: this.description,
      questionID: this.question.id,
      authorID: this.author.id,
    });
  }

  public isFact(): boolean {
    return this.id === this.question.getFact()?.id;
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

    const fact = this.isFact() ? 'fact,' : '';
    const ellipsis = this.description.length > 20 ? '...' : '';

    return `${color}[Answer(${fact}${this.description.slice(
      0,
      20,
    )}${ellipsis})]\x1b[0m`;
  }
}

export namespace Answer {
  export type DTO = Model.DTO & {
    description: string;
    questionID: string;
    authorID: string;
  };

  export type NewProps = Model.NewProps & {
    description: string;
    question: Question;
    author: Player;
  };
}
