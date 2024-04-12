import { SubjectPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface ICreateSubjectPulseUsecase {
  execute(
    payload: ICreateSubjectPulseUsecase.Payload,
  ): Promise<SubjectPulseModel>;
}

export namespace ICreateSubjectPulseUsecase {
  export type Payload = {
    origin: Vector;
    gap: number;
    amount: number;
    landmarkID: string;
  };
}
