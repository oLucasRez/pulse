import { Color } from '@domain/enums';

import { uuid } from '@utils';

import { Dice, Game, Subject, User } from '..';

export interface Player {
  id: string;
  name: string;
  color: Color;
  user: User | null;
  game: Game;
  dice: Dice;
  subject: Subject | null;
}

type ConstructorProps = {
  id?: string;
  name: string;
  color: Color;
  user?: User;
  game: Game;
  dice: Dice;
};

type CreateSubjectProps = {
  description: string;
};

export class Player implements Player {
  constructor(props: ConstructorProps) {
    const { id = uuid(), name, color, user = null, game, dice } = props;

    this.id = id;
    this.name = name;
    this.color = color;
    this.user = user;
    this.game = game;
    this.dice = dice;
    this.subject = null;
  }

  createSubject(props: CreateSubjectProps) {
    const { description } = props;

    const subject = new Subject({
      description,
      color: this.color,
      author: this,
    });

    this.subject = subject;

    return subject;
  }
}
