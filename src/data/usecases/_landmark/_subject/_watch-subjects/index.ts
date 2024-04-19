import { IWatchSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class WatchSubjectsUsecase implements IWatchSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({ subjectDAO, subjectHydrator }: Deps) {
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(
    callback: IWatchSubjectsUsecase.Callback,
  ): Promise<IWatchSubjectsUsecase.Response> {
    return this.subjectDAO.watch(async (dtos) => {
      const subjects = await Promise.all(
        dtos.map((dto) => this.subjectHydrator.hydrate(dto)),
      );

      callback(subjects);
    });
  }
}

type Deps = {
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
