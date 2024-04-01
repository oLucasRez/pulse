import { SubjectPulseModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface CreateSubjectPulseUsecase {
  execute(
    payload: CreateSubjectPulseUsecase.Payload,
  ): Promise<SubjectPulseModel>;
}

export namespace CreateSubjectPulseUsecase {
  export type Payload = {
    origin: Vector;
    gap: number;
    amount: number;
    landmarkID: string;
  };
}
