import { SubjectModel } from '@domain/models';

export interface WatchSubjectsUsecase {
  execute(
    callback: WatchSubjectsUsecase.Callback,
  ): Promise<WatchSubjectsUsecase.Response>;
}

export namespace WatchSubjectsUsecase {
  export type Callback = (subjects: SubjectModel[]) => void;
  export type Response = () => void;
}
