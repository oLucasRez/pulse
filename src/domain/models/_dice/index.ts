import { random, uuid } from '@utils';

import { vector } from '@types';

export interface Dice {
  id: string;
  sides: number;
  value: number | null;
  position: vector | null;
}

type ConstructorProps = {
  id?: string;
  sides: number;
  value?: number;
  position?: vector;
};

export class Dice implements Dice {
  static friction: number = 0.1;

  constructor(props: ConstructorProps) {
    const { id = uuid(), sides, value = null, position = null } = props;

    this.id = id;
    this.sides = sides;
    this.value = value;
    this.position = position;
  }

  roll(newPosition: vector) {
    const value = random({ min: 1, max: this.sides, type: 'int' });

    this.position = newPosition;
    this.value = value;

    return value;
  }

  // // @todo: criar bounds pro dado conseguir ricochetear
  // // @obs: talvez eu tenha acoplado o domínio com apresentação (animação)
  // *roll(
  //   initialPosition: vector,
  //   initialVelocity: vector,
  // ): Generator<Dice, number, number | undefined> {
  //   this.position = initialPosition;
  //   this.velocity = initialVelocity;

  //   while (round(this.velocity.mag(), 2) > 0) {
  //     const acceleration = this.velocity['*'](-Dice.friction);

  //     const timeToStop = this.velocity['-'](initialVelocity)
  //       ['/'](acceleration.mag())
  //       .mag();

  //     const timeStep = (yield this) || timeToStop;

  //     if (timeToStop <= 0) break;

  //     this.velocity = this.velocity['+'](acceleration['*'](timeStep));
  //     this.position = this.position['+'](this.velocity['*'](timeStep));
  //   }

  //   this.position = initialPosition['+'](
  //     initialVelocity['/'](Dice.friction)['*'](
  //       1 - Math.exp(-Dice.friction * Number.MAX_SAFE_INTEGER),
  //     ),
  //   );
  //   this.velocity = Vector(0, 0);

  //   return random({ min: 1, max: this.sides, type: 'int' });
  // }

  toString() {
    return `D${this.sides}`;
  }
}
