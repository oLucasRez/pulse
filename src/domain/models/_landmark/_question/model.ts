import { Answer, Player, Subject } from '../..';
import { Landmark } from '../model';

export class Question extends Landmark {
  protected override position: NonNullable<Landmark['position']>;
  private description: string;
  private subjects: Subject[];
  private author: Player;
  private answers: Answer[];
  private fact: Answer | null;

  protected constructor(props: Question.NewProps) {
    const {
      position,
      description,
      subjects,
      author,
      answers = [],
      fact = null,
      ...landmarkProps
    } = props;

    super(landmarkProps);

    this.position = position;
    this.description = description;
    this.subjects = subjects;
    this.author = author;
    this.answers = answers;
    this.fact = fact;
  }
  public static create(props: Question.CreateProps): Question {
    return new Question(props);
  }
  public static recreate(props: Question.RecreateProps): Question {
    return new Question(props);
  }

  public getPosition(): Question['position'] {
    return this.position;
  }

  public getDescription(): Question['description'] {
    return this.description;
  }

  public getSubjects(): Question['subjects'] {
    return this.subjects;
  }

  public getAuthor(): Question['author'] {
    return this.author;
  }

  public getFact(): Question['fact'] {
    return this.fact;
  }

  public createAnswer(props: Question.CreateAnswerProps): Answer {
    const answer = Answer.create({ ...props, question: this });

    this.answers.push(answer);

    return answer;
  }

  public solve(decidedAnswer: Answer): void {
    const answer = this.answers.find((answer) => answer.equals(decidedAnswer));

    if (!answer) throw 'Answer not found';

    this.fact = answer;
  }
}
// ============================================================================
export namespace Question {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Omit<Landmark.CreateProps, 'position'> & {
    position: Question['position'];
    description: Question['description'];
    subjects: Question['subjects'];
    author: Question['author'];
  };

  export type RecreateProps = Landmark.RecreateProps &
    Required<CreateProps> & {
      answers: Question['answers'];
      fact: Question['fact'];
    };

  export type CreateAnswerProps = Omit<Answer.NewProps, 'question'>;
}
