import { uuid } from '@utils';

export class Model {
  public readonly id: string;

  protected constructor(props: Model.ConstructorProps) {
    const { id = uuid() } = props;

    this.id = id;
  }

  public isEqual(model: Model): boolean {
    return this.id === model.id;
  }
}

export namespace Model {
  export type ConstructorProps = {
    id?: string;
  };
}
