import { Color } from '@domain/enums';

import { vector } from '@types';

import { Player } from '../..';
import { Landmark } from '../landmark';

export class Subject extends Landmark {
  private _description: string;
  public get description(): string {
    return this._description;
  }

  private _color: Color;
  public get color(): Color {
    return this._color;
  }

  private _author: Player;
  public get author(): Player {
    return this._author;
  }

  public constructor(props: Subject.NewProps) {
    const { description, color, author, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this._description = description;
    this._color = color;
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
    }[this._color];

    return `${color}[Subject(${this.description})]\x1b[0m`;
  }

  public updatePosition(value: vector): void {
    this._position = value;
  }
}

export namespace Subject {
  export type NewProps = Landmark.NewProps & {
    description: string;
    color: Color;
    author: Player;
  };
}
