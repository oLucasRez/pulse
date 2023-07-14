import { uuid } from '@utils';

export interface User {
  id: string;
  name: string;
}

type ConstructorProps = {
  id?: string;
  name: string;
};

export class User implements User {
  constructor(props: ConstructorProps) {
    const { id = uuid(), name } = props;

    this.id = id;
    this.name = name;
  }
}
