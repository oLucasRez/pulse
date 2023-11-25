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
    const { description, color, author, path = [], ...landmarkProps } = props;

    super({ ...landmarkProps });

    this.description = description;
    this.color = color;
    this.author = author;
    this.path = path;
  }

  public getPosition(): Subject['position'] {
    return this.position;
  }

  public getDescription(): Subject['description'] {
    return this.description;
  }

  public getColor(): Subject['color'] {
    return this.color;
  }

  public getAuthor(): Subject['author'] {
    return this.author;
  }

  public getPath(): Subject['path'] {
    return this.path;
  }

  public getLastPulse(): SubjectPulse | null {
    if (!this.path.length) return null;

    return this.path[this.path.length - 1];
  }

  public updatePosition(value: vector): void {
    this.position = value;
  }

  public createPulse(props: Subject.CreatePulseProps): SubjectPulse {
    if (!this.position) throw 'Subject must be on the map';

    const pulse = new SubjectPulse({
      ...props,
      landmark: this,
    });

    this.path.push(pulse);

    return pulse;
  }
}
// ============================================================================
export namespace Subject {
  export type NewProps = Landmark.NewProps & {
    description: Subject['description'];
    color: Subject['color'];
    author: Subject['author'];
    path?: Subject['path'];
  };

  export type CreatePulseProps = Omit<
    SubjectPulse.NewProps,
    'origin' | 'landmark'
  >;
}
