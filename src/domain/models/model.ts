import { uuid } from '@utils';

type ConstructorProps = {
  id?: string;
};

export class Model {
  public readonly id: string;

  protected constructor(props: ConstructorProps) {
    const { id = uuid() } = props;

    this.id = id;
  }

  public isEqual(model: Model): boolean {
    return this.id === model.id;
  }
}
