import {
  CentralPulse,
  LightSpot,
  Model,
  Pulse,
  Subject,
  SubjectPulse,
} from '@domain/models';

export class Map extends Model {
  private centralPulse: CentralPulse;
  private subjectPulses: Pulse<Subject>[];

  public constructor(props: Map.NewProps) {
    const {
      centralPulse = new CentralPulse({}),
      subjectPulses = [],
      ...modelProps
    } = props;

    super(modelProps);

    this.centralPulse = centralPulse;
    this.subjectPulses = subjectPulses;
  }

  public getCentralPulse(): Map['centralPulse'] {
    return this.centralPulse;
  }

  public getSubjectPulses(): Map['subjectPulses'] {
    return this.subjectPulses;
  }

  public getPulses(): Pulse[] {
    return [...this.subjectPulses, this.centralPulse];
  }

  public createSubjectPulse(
    subject: Subject,
    props: Map.CreateSubjectPulseProps,
  ): SubjectPulse {
    const subjectPulse = subject.createPulse(props);

    this.subjectPulses.push(subjectPulse);

    return subjectPulse;
  }

  public createLightSpot(props: Map.CreateLightSpotProps): LightSpot {
    const lightSpot = new LightSpot(props);

    this.subjectPulses.push(lightSpot);

    return lightSpot;
  }
}
// ============================================================================
export namespace Map {
  export type NewProps = Model.NewProps & {
    centralPulse?: Map['centralPulse'];
    subjectPulses?: Map['subjectPulses'];
  };

  export type CreateSubjectPulseProps = Subject.CreatePulseProps;

  export type CreateLightSpotProps = LightSpot.NewProps;
}
