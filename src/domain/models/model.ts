import { uuid } from '@utils';

export class Model {
  public readonly id: string;

  protected constructor(props: Model.NewProps) {
    const { id = uuid() } = props;

    this.id = id;
  }

  protected toDTO(): Model.DTO {
    return Object.freeze({
      id: this.id,
    });
  }

  public isEqual(model: Model.IsEqual.Props): Model.IsEqual.Return {
    return this.id === model.id;
  }
}

export namespace Model {
  export type DTO = {
    id: string;
  };

  export type NewProps = {
    id?: string;
  };

  export namespace IsEqual {
    export type Props = Model;
    export type Return = boolean;
  }
}
