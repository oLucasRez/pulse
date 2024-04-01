import { SubjectPulseModel } from '@domain/models';

export interface WatchSubjectPulsesUsecase {
  execute(
    callback: WatchSubjectPulsesUsecase.Callback,
  ): Promise<WatchSubjectPulsesUsecase.Response>;
}

export namespace WatchSubjectPulsesUsecase {
  export type Callback = (subjectPulses: SubjectPulseModel[]) => void;
  export type Response = () => void;
}
