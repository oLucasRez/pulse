import { Vector } from '@utils';

import { Landmark } from '../model';

export class CentralFact extends Landmark {
  protected override position: NonNullable<Landmark['position']>;
  private description: string;

  protected constructor(props: CentralFact.NewProps) {
    const { description, ...landmarkProps } = props;

    super(landmarkProps);

    this.position = Vector(0, 0);
    this.description = description;
  }
  public static create(props: CentralFact.CreateProps): CentralFact {
    return new CentralFact(props);
  }
  public static recreate(props: CentralFact.RecreateProps): CentralFact {
    return new CentralFact(props);
  }

  public getPosition(): CentralFact['position'] {
    return this.position;
  }

  public getDescription(): CentralFact['description'] {
    return this.description;
  }

  public updateDescription(value: CentralFact['description']): void {
    this.description = value;
  }
}
// ============================================================================
export namespace CentralFact {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Omit<Landmark.CreateProps, 'position'> & {
    description: CentralFact['description'];
  };

  export type RecreateProps = Omit<Landmark.RecreateProps, 'position'> &
    Required<CreateProps>;
}
