import { Color } from '@domain/enums';
import { SubjectModel } from '@domain/models';

export interface ICreateLightSpotSubjectUsecase {
  execute(
    payload: ICreateLightSpotSubjectUsecase.Payload,
  ): Promise<SubjectModel>;
}

export namespace ICreateLightSpotSubjectUsecase {
  export type Payload = {
    description: string;
    icon: string;
    color: Color;
  };
}
