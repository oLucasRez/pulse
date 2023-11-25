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

  protected constructor(props: Map.NewProps) {
    const {
      centralPulse = CentralPulse.create({}),
      subjectPulses = [],
      ...modelProps
    } = props;

    super(modelProps);

    this.centralPulse = centralPulse;
    this.subjectPulses = subjectPulses;
  }
  public static create(props: Map.CreateProps): Map {
    return new Map(props);
  }
  public static recreate(props: Map.CreateProps): Map {
    return new Map(props);
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
    const lightSpot = LightSpot.create(props);

    this.subjectPulses.push(lightSpot);

    return lightSpot;
  }
}
// ============================================================================
export namespace Map {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps;

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      centralPulse: Map['centralPulse'];
      subjectPulses: Map['subjectPulses'];
    };

  export type CreateSubjectPulseProps = Subject.CreatePulseProps;

  export type CreateLightSpotProps = LightSpot.NewProps;
}
