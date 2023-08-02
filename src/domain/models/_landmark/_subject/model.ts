import { Color } from '@domain/enums';

import { vector } from '@types';

import { Player, SubjectPulse } from '../..';
import { Landmark } from '../model';

export class Subject extends Landmark {
  private description: string;
  private color: Color;
  private author: Player;
  private path: SubjectPulse[];

  public constructor(props: Subject.NewProps) {
    const { description, color, author, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this.description = description;
    this.color = color;
    this.author = author;
    this.path = [];
  }

  public toDTO(): Subject.DTO {
    const landmarkDTO = super.toDTO();

    return Object.freeze({
      ...landmarkDTO,
      description: this.description,
      color: this.color,
      authorID: this.author.id,
      pathID: this.path.map(({ id }) => id),
    });
  }

  public getPosition(): vector | null {
    return this.position;
  }

  public getColor(): Color {
    return this.color;
  }

  public updatePosition(value: vector): void {
    this.position = value;
  }

  public createPulse(props: Subject.CreatePulseProps): SubjectPulse {
    if (!this.position) throw 'Subject must be on the map';

    const pulse = new SubjectPulse({
      ...props,
      origin: this.position,
      subject: this,
    });

    this.path.push(pulse);

    return pulse;
  }

  public getLastPulse(): SubjectPulse | null {
    if (!this.path.length) return null;

    return this.path[this.path.length - 1];
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

    return `${color}[Subject(${this.description})]\x1b[0m`;
  }
}

export namespace Subject {
  export type DTO = Landmark.DTO & {
    description: string;
    color: Color;
    authorID: string;
    pathID: string[];
  };

  export type NewProps = Landmark.NewProps & {
    description: string;
    color: Color;
    author: Player;
  };

  export type CreatePulseProps = Omit<
    SubjectPulse.NewProps,
    'origin' | 'subject'
  >;
}
