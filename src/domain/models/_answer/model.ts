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

  public getDescription(): Answer['description'] {
    return this.description;
  }

  public getQuestion(): Answer['question'] {
    return this.question;
  }

  public getAuthor(): Answer['author'] {
    return this.author;
  }

  public toFact(): void {
    this.question.solve(this);
  }

  public isFact(): boolean {
    return this.id === this.question.getFact()?.id;
  }
}

export namespace Answer {
  export type NewProps = Model.NewProps & {
    description: Answer['description'];
    question: Answer['question'];
    author: Answer['author'];
  };
}
