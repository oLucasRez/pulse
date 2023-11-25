import { uuid } from '@utils';

export abstract class Model {
  public readonly id: string;

  protected constructor(props: Model.NewProps) {
    const { id = uuid() } = props;

    this.id = id;
  }

  public equals(model: Model): boolean {
    return this.id === model.id;
  }
}
// ============================================================================
export namespace Model {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = {};

  export type RecreateProps = CreateProps & {
    id: Model['id'];
  };
}
