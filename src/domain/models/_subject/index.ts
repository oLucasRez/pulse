import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { Player } from '..';

type ConstructorProps = {
  id?: string;
  description: string;
  color: Color;
  author: Player;
};

export class Subject {
  public readonly id: string;

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

  public constructor(props: ConstructorProps) {
    const { id = uuid(), description, color, author } = props;

    this.id = id;
    this._description = description;
    this._color = color;
    this._author = author;
  }

  public toString(): string {
    const colorMap: Record<Color, string> = {
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
    };

    return `${colorMap[this.color]}[Subject(${this.description})]\x1b[0m`;
  }
}
