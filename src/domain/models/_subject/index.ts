import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { Player } from '..';

export interface Subject {
  id: string;
  description: string;
  color: Color;
  author: Player;
}

type ConstructorProps = {
  id?: string;
  description: string;
  color: Color;
  author: Player;
};

export class Subject implements Subject {
  constructor(props: ConstructorProps) {
    const { id = uuid(), description, color, author } = props;

    this.id = id;
    this.description = description;
    this.color = color;
    this.author = author;
  }
}
