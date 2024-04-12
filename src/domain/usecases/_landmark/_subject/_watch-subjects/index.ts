import { SubjectModel } from '@domain/models';

export interface IWatchSubjectsUsecase {
  execute(
    callback: IWatchSubjectsUsecase.Callback,
  ): Promise<IWatchSubjectsUsecase.Response>;
}

export namespace IWatchSubjectsUsecase {
  export type Callback = (subjects: SubjectModel[]) => void;
  export type Response = () => void;
}
