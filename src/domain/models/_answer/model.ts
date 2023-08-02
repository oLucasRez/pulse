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
