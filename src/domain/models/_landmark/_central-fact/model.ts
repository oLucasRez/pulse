import { Vector } from '@utils';

import { Landmark } from '../model';

export class CentralFact extends Landmark {
  protected override position: NonNullable<Landmark['position']>;
  private description: string;

  public constructor(props: CentralFact.NewProps) {
    const { description, ...landmarkProps } = props;

    super({ ...landmarkProps });

    this.position = Vector(0, 0);
    this.description = description;
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

export namespace CentralFact {
  export type NewProps = Omit<Landmark.NewProps, 'position'> & {
    description: CentralFact['description'];
  };
}
