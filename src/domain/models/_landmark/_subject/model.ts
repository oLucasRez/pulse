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
