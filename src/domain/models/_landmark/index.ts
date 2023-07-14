import { uuid } from '@utils';

import { vector } from '@types';

export interface Landmark {
  id: string;
  position: vector;
}

type ConstructorProps = {
  id?: string;
  position: vector;
};

export class Landmark implements Landmark {
  constructor(props: ConstructorProps) {
    const { id = uuid(), position } = props;

    this.id = id;
    this.position = position;
  }
}
