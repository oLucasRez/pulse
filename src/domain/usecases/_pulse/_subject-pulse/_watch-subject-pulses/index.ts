import { SubjectPulseModel } from '@domain/models';

export interface IWatchSubjectPulsesUsecase {
  execute(
    callback: IWatchSubjectPulsesUsecase.Callback,
  ): Promise<IWatchSubjectPulsesUsecase.Response>;
}

export namespace IWatchSubjectPulsesUsecase {
  export type Callback = (subjectPulses: SubjectPulseModel[]) => void;
  export type Response = () => void;
}
